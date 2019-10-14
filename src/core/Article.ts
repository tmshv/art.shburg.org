import Data from './Data'
import Image from './Image'
import Config from './Config'
import { find, findOne, total } from '../lib/store'

const store = () => Data.getStore('Article')

function make(C) {
    return x => new C(x)
}

export default class Article {
    static async find(query, options = {}): Promise<Article[]> {
        const items = await find(store(), query, options as any)

        return Promise.all(items.map(processArticle))
    }

    static async findById(id) {
        const item = await findOne(store(), { id })

        return !item
            ? null
            : processArticle(item)
    }

    static async total(query = {}) {
        return total(store(), query)
    }

    static async findPinned() {
        const now = new Date()
        const query = { until: { $gte: now } }

        return Article.find(query, {
            sort: { date: -1 },
        })
    }

    public id: any
    public images: any
    public post: any
    public folder: any
    public date: any
    public title: any
    public until: any
    public tags: any
    public content: any
    public hash: any
    public type: any
    public origin: any
    public file: any
    public version: any
    public preview: any
    public url: any

    constructor(data) {
        this.id = data.id
        this.images = data.images
        this.post = data.post
        this.folder = data.folder
        this.date = data.date
        this.title = data.title
        this.until = data.until
        this.tags = (data.tags || []).map(make(Tag))
        this.content = data.content
        this.hash = data.hash
        this.type = data.type
        this.origin = data.origin
        this.file = data.file
        this.version = data.version
        this.preview = data.preview

        this.url = `/article/${this.id}`
    }

    plain() {
        return {
            id: this.id,
            images: this.images,
            post: this.post,
            folder: this.folder,
            date: this.date,
            title: this.title,
            until: this.until,
            tags: this.tags,
            content: this.content,
            hash: this.hash,
            type: this.type,
            origin: this.origin,
            file: this.file,
            version: this.version,
            preview: this.preview,
            url: this.url,
        }
    }
}

class Tag {
    public name: string

    constructor(tag) {
        this.name = tag;
    }
}

const previewFromImage = (imgs = []) => imgs.length
    ? imgs[0]
    : null

async function resolveDefaultPreview() {
    const config = await Config.findConfig()
    if (!config) return null

    return Image.findByFile(config.articleCardDefaultPreview)
}

async function processArticle(article) {
    let preview = null
    const previewId = article.preview
        ? article.preview
        : previewFromImage(article.images)

    if (previewId) {
        preview = await Image.findById(previewId)
    } else {
        preview = await resolveDefaultPreview()
    }

    return new Article({
        ...article,
        preview,
    })
}