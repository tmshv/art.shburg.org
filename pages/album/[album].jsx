import React from 'react'
import Head from 'next/head'
import { App } from '../../src/components/App'
import Article from '../../src/components/Article'
import Html from '../../src/components/Html'
import menuModel from '../../src/models/menu'
import { buildMenu } from '../../src/lib/menu'
import { createApiUrl, requestGet, wrapInitialProps } from '../../src/next-lib'

const Page = (props) => (
    <App
        menu={buildMenu(props.pageUrl, menuModel)}
        showAuthor={true}
        menuPadding={true}
        layout={'thin'}
    >
        <Head>
            <title>{props.album.title}</title>
        </Head>
        <Article
            title={props.album.title}
            date={props.album.date}
            shareable={true}
        >
            <Html
                html={props.album.post}
            />
        </Article>
    </App>
)

Page.getInitialProps = wrapInitialProps(async (ctx) => {
    const pageUrl = '/gallery'
    const id = ctx.query.album
    const album = await requestGet(createApiUrl(`/api/albums/${id}`), {})

    return {
        album,
        pageUrl,
    }
})

export default Page