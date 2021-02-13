type StrapiMediaObject = {
    url: string,
    name: string,
    hash: string,
    ext: string,
    mime: string,
    width: number,
    height: number,
    size: number,
    // "path": null,
}

type StrapiMedia = StrapiMediaObject & {
    id: number,
    alternativeText: string | null,
    caption: string | null,
    // "previewUrl": null,
    // "provider": "digitalocean",
    // "provider_metadata": null,
    // "created_at": "2021-01-31T20:55:04.027Z",
    // "updated_at": "2021-01-31T20:55:04.027Z"
    formats: null | {
        thumbnail: StrapiMediaObject,
        large: StrapiMediaObject,
        medium: StrapiMediaObject,
        small: StrapiMediaObject,
    },
}

type StrapiComponentText = {
    __component: "hudozka.text",
    id: number,
    text: string,
}

type StrapiComponentImage = {
    __component: "hudozka.image",
    id: number,
    wide: boolean,
    caption: string,
    media: StrapiMedia,
}

type StrapiComponentDocument = {
    __component: "hudozka.document",
    id: number,
    title: string,
    media: StrapiMediaObject
    // "media": {
    //     "id": 210,
    //     "name": "Положение.pdf",
    //     // "alternativeText": null,
    //     // "caption": null,
    //     // "width": null,
    //     // "height": null,
    //     // "formats": null,
    //     // "hash": "Polozhenie_efaf157737",
    //     // "ext": ".pdf",
    //     // "mime": "application/pdf",
    //     // "size": 103.79,
    //     "url": "https://hudozkacdn.tmshv.com/Polozhenie_efaf157737.pdf",
    //     // "previewUrl": null,
    //     // "provider": "digitalocean",
    //     // "provider_metadata": null,
    //     // "created_at": "2021-01-31T21:14:03.158Z",
    //     // "updated_at": "2021-01-31T21:14:03.158Z",
    // }
}

type StrapiComponentEmbed = {
    __component: "hudozka.embed",
    id: number,
    src: string,
}

export type StrapiComponent =
    | StrapiComponentText
    | StrapiComponentImage
    | StrapiComponentDocument
    | StrapiComponentEmbed

export type StrapiPage = {
    id: number,
    title: string,
    excerpt: string,
    slug: string,
    date?: string,
    cover?: StrapiMedia,
    published_at: string,
    created_at: string,
    updated_at: string,
    content: StrapiComponent[],
    // "tags": [
    //     {
    //         "id": 5,
    //         "slug": "hudozka",
    //         "name": "Художка",
    //         "page": 114,
    //         "created_at": "2021-01-31T20:38:39.373Z",
    //         "updated_at": "2021-02-04T04:04:34.943Z"
    //     },
    //     {
    //         "id": 6,
    //         "slug": "public-space",
    //         "name": "Среда",
    //         "page": 114,
    //         "created_at": "2021-01-31T20:38:39.722Z",
    //         "updated_at": "2021-02-04T04:04:34.943Z"
    //     }
    // ],
    // "breadcrumbs": [],
    // "breadcrumbRelations": []
}