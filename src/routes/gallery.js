const React = require('react')
const Article = require('../components/Article')
const Album = require('../core/Album')
const {render} = require('../lib/render')
const getPathWithNoTrailingSlash = require('../lib/url').getPathWithNoTrailingSlash
const {get} = require('koa-route')

function getMeta() {
	return {
		title: 'Галерея',
		description: 'Галерея работ учащихся Шлиссельбургской Детской Художественной Школы'
	}
}

const GItem = ({album}) => (
	<div className="gallery-item">
		<a href={album.url}>
			<h2>{album.title}</h2>
			<img src={album.preview.url} alt={album.title}/>
		</a>
	</div>
)

const ACollection = ({title, albums}) => (
	<div className="album-collection">
		<div className="album-collection__title">{title}</div>
		<div className="album-collection__body">{
			albums.map((album, index) => (
				<GItem key={index} album={album}/>
			))
		}</div>
	</div>
)

function splitBy(key) {
	return items => {
		return items.reduce((acc, item) => {
			const name = key(item)
			const items = acc.get(name) || []

			return acc.set(key(item), [...items, item])
		}, new Map())
	}
}

function getGallery() {
	return get('/gallery', async ctx => {
		const path = getPathWithNoTrailingSlash(ctx.path)
		const query = {}
		const albums = await Album.find(query, {sort: {date: -1}})

		if (albums.length) {
			const meta = getMeta()
			const albumsByYear = splitBy(a => a.date.getFullYear())(albums)

			const Component = (
				<div className="content content_wide">
					<Article title={meta.title}>
						{
							[...albumsByYear.entries()].map(([year, albums]) => (
								<ACollection
									title={year}
									albums={albums}
								/>
							))
						}
					</Article>
				</div>
			)

			ctx.type = 'text/html'
			ctx.body = await render(path, Component, getMeta())
		} else {
			ctx.status = 404
		}
	})
}

exports.getGallery = getGallery
