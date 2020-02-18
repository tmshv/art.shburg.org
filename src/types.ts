export interface IDocument {
    category: string
    fileName: string
    fileSize: number
    fileUrl: string
    imageUrl: string
    title: string
    url: string
}

export interface IMeta {
    url: string
    siteName: string
    locale: string
    type: string
    description: string
    domain: string
    title: string
    image: string
    imageWidth: number
    imageHeight: number
    twitterCard: string
    twitterSite: string
    twitterCreator: string
}

export interface IImage {
    alt: string
    src: string
    srcSet: Array<{ url: string, density: number }>
    set: any // TODO
}

export interface IArticle {
    id: string
    featured: boolean
    url: string
    title: string
    preview: IImage
}
