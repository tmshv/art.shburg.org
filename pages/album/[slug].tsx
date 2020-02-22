import Head from 'next/head'
import { App } from 'src/components/App'
import { Article } from 'src/components/Article'
import { Html } from 'src/components/Html'
import { createApiUrl, requestGet, IResponseItems } from 'src/next-lib'
import { NextPage } from 'next'

type Props = {
    data: any //(album)
}

const Page: NextPage<Props> = props => {
    if (!props?.data) {
        console.log('kek error', props)

        return null
    }

    return (
        <App
            showAuthor={true}
        >
            <Head>
                <title>{props.data.title}</title>
            </Head>

            <Article
                title={props.data.title}
                date={props.data.date}
                shareable={true}
                tags={[]}
            >
                <Html
                    html={props.data.post}
                />
            </Article>
        </App>
    )
}

export const unstable_getStaticProps = async (ctx: any) => {
    // const id = ctx.query.slug
    const id = ctx.params.slug
    const data = await requestGet(createApiUrl(`/api/albums/${id}`), null)

    if (!data) {
        throw new Error(`kek ${id}`)
    }

    return {
        props: {
            data,
        }
    }
}

export const unstable_getStaticPaths = async () => {
    console.log('call album unstable_getStaticPaths')

    const urls = await requestGet<IResponseItems<string>>(createApiUrl(`/api/albums/urls`), null)
    if (!urls) {
        return null
    }

    return {
        paths: urls.items
            .map(x => x.replace('/album/', ''))
            .map(slug => {
                return {
                    params: {
                        slug,
                    },
                }
            }),
    }
}

export default Page
