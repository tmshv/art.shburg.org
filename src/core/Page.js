const Data = require('./Data')
const Image = require('./Image')
const Config = require('./Config')
const {find, findOne, total} = require('../lib/store')

const store = () => Data.getStore(Page)

class Page {
	static async find(query, options = {}) {
		const items = await find(store(), query, options)

		return Promise.all(items.map(processPage))
	}

	static async findById(id) {
		const item = await findOne(store(), {id})

		return !item
			? null
			: processPage(item)
	}

	static async findByUrl(url) {
		const item = await findOne(store(), {url})

		return !item
			? null
			: processPage(item)
	}

	static async total(query = {}) {
		return total(store(), query)
	}

	constructor(data) {
		this.id = data.id
		this.hash = data.hash
		this.file = data.file
		this.url = data.url
		this.content = data.content
		this.title = data.title
		this.data = data.data
		this.images = data.images
		this.documents = data.documents
		this.preview = data.preview
	}

	plain() {
		return {
			id: this.id,
			images: this.images,
			documents: this.documents,
			data: this.data,
			title: this.title,
			content: this.content,
			hash: this.hash,
			file: this.file,
			preview: this.preview,
			url: this.url,
		}
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

async function processPage(article) {
	let preview = null
	const previewId = article.preview
		? article.preview
		: previewFromImage(article.images)

	if (previewId) {
		preview = await Image.findById(previewId)
	} else {
		preview = await resolveDefaultPreview()
	}

	return new Page({
		...article,
		preview,
	})
}

module.exports = Page