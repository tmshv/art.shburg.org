import axios from 'axios'
import { NextPageContext } from 'next'

export interface IResponseItems<T> {
    items: T[]
}

export async function requestGet<T>(url: string, defaultResponse: T): Promise<T> {
    try {
        const res = await axios.get<T>(url)

        return res.data
    } catch (e) {
        return defaultResponse
    }
}

/**
 * This wrapper prevents fetching api request in static export mode and production environment
 * because nextjs call getInitialProps on the client side
 * 
 * @param {*} fn 
 */
export function wrapInitialProps(fn: (ctx: NextPageContext) => void) {
    return async (ctx: NextPageContext) => {
        if (process.env.NODE_ENV === 'production' && process.browser) {
            return window['__NEXT_DATA__'].props.pageProps;
        }

        return fn(ctx)
    }
}

export function createApiUrl(req, path) {
    const { origin } = absoluteUrl(req, 'localhost:3000')

    return `${origin}${path}`
}

function absoluteUrl(req, defaultLocalhost) {
    let protocol = 'https:'
    let host = req
        ? (req.headers['x-forwarded-host'] || req.headers['host'])
        : window.location.host
    host = host || defaultLocalhost
    if (host.indexOf('localhost') > -1) {
        if (defaultLocalhost) host = defaultLocalhost
        protocol = 'http:'
    }
    const origin = protocol + '//' + host

    return {
        protocol,
        host,
        origin,
    }
}
