import Head from 'next/head'
import Image from 'next/image'
import { App } from 'src/components/App'
import { tail } from 'lodash'
import { Page } from 'src/components/Page'
import { Markdown } from 'src/components/Markdown'
import { Meta } from 'src/components/Meta'
import { MetaBuilder } from 'src/lib/meta'
import { apiGet } from '@/next-lib'
import { NextPage } from 'next'
import { IBreadcumbsPart, IMeta, ITag, FileTokenData, Token } from '@/types'
import { joinTokens } from 'src/lib/tokens'
import { size, ext } from 'src/lib/file'
import { Html } from 'src/components/Html'
import { Youtube } from '@/components/Youtube'
import { createPage, createPageUrls } from '@/remote/factory'
import { asArray } from '@/remote/lib'

const File: React.SFC<FileTokenData> = props => {
    const fileSize = size(props.file_size)
    const format = ext(props.file_format)

    return (
        <div className={'document-row'}>
            <a href={props['url']} className="invisible">
                <div className="document-row__image">
                    <Image
                        src={props['image_url']}
                        width={200}
                        height={200}
                    />
                </div>
            </a>

            <div className="document-row__file">
                <a href={props['url']}>{props['title']}</a>
            </div>

            <div className="document-row__file-info">
                <a href={props.file_url} target="_blank">
                    {format} ({fileSize})
                </a>
            </div>
        </div>
    )
}

type Props = {
    title: string
    tags: ITag[]
    date: string
    breadcrumb: IBreadcumbsPart[]
    meta?: IMeta
    tokens?: Token[]
}

const Index: NextPage<Props> = props => (
    <App
        contentStyle={{
            marginTop: 'var(--size-l)',
            marginBottom: 'var(--size-xl)',
        }}
        breadcrumbs={props.breadcrumb}
    >
        <Head>
            <title>{props.title}</title>
            {!props.meta ? null : (
                <Meta meta={props.meta} />
            )}
        </Head>

        <Page
            tags={props.tags}
            date={props.date ? new Date(props.date) : null}
        >
            <article className={'article'}>
                {joinTokens(props.tokens ?? []).map((x, i) => {
                    switch (x.token) {
                        case 'text':
                            return (
                                <Markdown
                                    data={x.data}
                                />
                            )

                        case 'html':
                            return (
                                <Html
                                    html={x.data}
                                />
                            )

                        case 'instagram':
                            return (
                                <Html
                                    html={x.data.embed}
                                />
                            )

                        case 'youtube':
                            return (
                                <Youtube
                                    url={x.data.url}
                                />
                            )

                        case 'image':
                            return (
                                <div className="kazimir__image">
                                    <figure>
                                        <Image
                                            src={x.data.src}
                                            alt={x.data.alt}
                                            width={x.data.width}
                                            height={x.data.height}
                                        />
                                        <figcaption>{x.data.caption}</figcaption>
                                    </figure>
                                </div>
                            )

                        case 'file':
                            return (
                                <File {...x.data} />
                            )

                        default:
                            return (
                                <pre>
                                    {JSON.stringify(x)}
                                </pre>
                            )
                    }
                })}
            </article>
        </Page>
    </App>
)

export const getStaticProps = async (ctx: any) => {
    let slug = null
    if (ctx.query) {
        slug = '/' + asArray(ctx.query.slug).join('/')
    } else {
        slug = '/' + asArray(ctx.params.slug).join('/')
    }

    let apiUrl = `https://hudozka.tmshv.com/pages?slug=${slug}`
    const page = await apiGet(createPage)(apiUrl, null)
    if (!page) {
        return {
            notFound: true,
        }
    }

    const description = page.description ?? undefined
    const breadcrumbSize = page?.breadcrumb?.length ?? 0
    const breadcrumb = breadcrumbSize < 2 ? null : page.breadcrumb
    const meta = (new MetaBuilder())
        .setImage(page.cover)
        .setTitle(page.title)
        .setDescription(description)
        .build()
    const tokens = page.tokens

    return {
        props: {
            tokens,
            title: page.title,
            tags: page.tags,
            date: page.date,
            meta,
            breadcrumb,
        }
    }
}

export const getStaticPaths = async () => {
    let apiUrl = `https://hudozka.tmshv.com/pages`
    const urls = await apiGet(createPageUrls)(apiUrl, null)
    if (!urls) {
        return null
    }

    return {
        fallback: false,
        paths: urls.items
            .map(path => {
                const slug = tail(path.split('/'))

                return {
                    params: {
                        slug,
                    },
                }
            }),
    }
}

export default Index
