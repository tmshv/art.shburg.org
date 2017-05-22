const React = require('react')
import {get} from 'koa-route'
import {c} from '../core/db'
const Article = require('../components/Article')
const ArticleList = require('../components/ArticleList')
const Paginator = require('../components/Paginator')
const {render} = require('../lib/render')
const getPathWithNoTrailingSlash = require('../lib/url').getPathWithNoTrailingSlash
const timestamp = require('../lib/date').timestamp
const {sortBy} = require('../utils/sort')
const accepts = require('./index').accepts

const sortArticleByDate = sortBy(
	i => timestamp(new Date(i.date))
)

const articleUrl = article => `/article/${article.id}`

async function findArticle(id) {
	return c('articles').findOne({id: id})
}

async function findArticlesNin(nin, skip, limit, sort) {
	return c('articles')
		.find({
			_id: {$nin: nin}
		})
		.sort(sort)
		.skip(skip)
		.limit(limit)
		.toArray()
}

async function totalArticles() {
	return c('articles')
		.find({})
		.count()
}

async function findPinned(page) {
	const now = new Date()
	return page !== 1
		? []
		: await c('articles')
			.find({until: {$gte: now}})
			.sort({date: -1})
			.toArray()
}

function getMeta(article) {
	return {
		title: article.title,
	}
}

function getArticles(pageSize) {
	return get('/articles/:page?', async (ctx, page) => {
		const path = getPathWithNoTrailingSlash(ctx.path)
		page = parseInt(page) || 1

		const limit = pageSize
		const skip = (page - 1) * pageSize

		const pinnedArticles = await findPinned(page)
		const total = await totalArticles()
		const totalPages = total / pageSize

		const id = i => i._id
		const pinnedIds = pinnedArticles.map(id)
		const articles = await findArticlesNin(pinnedIds, skip, limit, {date: -1})

		const prevPage = page > 1
			? page - 1
			: null

		const nextPage = page < totalPages
			? page + 1
			: null

		const content = [
			...pinnedArticles.sort(sortArticleByDate),
			...articles
		]
			.map(article => ({
				...article,
				url: articleUrl(article),
			}))
		const Component = (
			<ArticleList
				articles={content}
				prevPage={prevPage}
				nextPage={nextPage}
			/>
		)

		ctx.body = await render(path, Component, getMeta({title: `Статьи`}))
	})
}

function getArticle() {
	return get('/article/:id', accepts({
		'text/html': async (ctx, id) => {
			const path = getPathWithNoTrailingSlash(ctx.path)
			const article = await findArticle(id)

			if (article) {
				const Component = (
					<div className="content content_thin">
						<Article
							title={article.title}
							date={article.date}
							data={article.post}
						/>
					</div>
				)

				ctx.type = 'text/html'
				ctx.body = await render(path, Component, getMeta(article), {commentsEnabled: true})
			} else {
				ctx.status = 404
			}
		},
		'application/json': async (ctx, id) => {
			const article = await findArticle(id)

			if (article) {
				ctx.body = article
			} else {
				ctx.status = 404
			}
		}
	}))
}

exports.getArticles = getArticles
exports.getArticle = getArticle
