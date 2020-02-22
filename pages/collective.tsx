import Head from 'next/head'
import { get } from 'lodash'
import { App } from 'src/components/App'
import { Meta } from 'src/components/Meta'
import { CollectiveImage } from 'src/components/CollectiveImage'
import { meta } from 'src/lib/meta'
import { IMeta, IImage } from 'src/types'
import { createApiUrl, requestGet, IResponseItems } from 'src/next-lib'
import { NextPage, NextPageContext } from 'next'
import { CardGrid } from 'src/components/CardGrid'
import { Card } from 'src/components/Card'

interface IPerson {
    url: string
    name: string
    position: string
    picture: IImage
}

type Props = {
    title: string
    image: string
    meta: IMeta
    data: IPerson[]
}

const Page: NextPage<Props> = props => {
    if (!props.data) {
        console.log('kek error')
        return
    }

    return (
        <App
            showAuthor={true}
            wide={true}
        >
            <Head>
                <title>{props.title}</title>
                <Meta meta={props.meta} />
            </Head>

            {!props.image ? null : (
                <CollectiveImage
                    data={props.image}
                    style={{
                        marginBottom: 'var(--size-l)',
                    }}
                />
            )}

            <CardGrid style={{
                marginBottom: 'var(--size-xl)',
            }}>
                {props.data.map((item, index) => (
                    <Card
                        key={index}
                        layout={'featured'}
                        img={{
                            src: item.picture.src,
                            alt: item.name,
                            srcSet: '',//item.name.sr,
                        }}
                        href={item.url}
                    >
                        <h2 style={{
                            margin: '0 0 var(--size-s)',
                            fontSize: '14pt',
                        }}>
                            {item.name[0]} {item.name[1]} {item.name[2]}
                        </h2>
                        {item.position}
                    </Card>
                ))}
            </CardGrid>
        </App>
    )
}

export const unstable_getStaticProps = async (ctx: NextPageContext) => {
    // const pageUrl = ctx.req.url

    const res = await requestGet<IResponseItems<IPerson>>(createApiUrl('/api/persons'), null)
    const data = res?.items || []
    const title = 'Преподаватели Шлиссельбургской ДХШ'
    const imageFile = 'Images/HudozkaCollective2017.jpg'
    const resImage = await requestGet(createApiUrl(`/api/image?file=${imageFile}`), null)
    const image = get(resImage, 'artifacts.large', null)

    return {
        props: {
            data,
            image,
            title,
            meta: meta({
                title,
                description: 'Преподаватели Шлиссельбургской ДХШ',
            })
        }
    }
}

export default Page
