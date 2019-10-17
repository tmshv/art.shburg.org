import React from 'react'
import Paginator from './Paginator'
import { ArticleCard } from './ArticleCard'

export const ArticleCardList = ({ articles, nextPage, prevPage }) => (
    <div>
        <style jsx>{`
            .body {
                display: flex;
                flex-direction: row;
                justify-content: center;
                flex-wrap: wrap;
            }
        `}</style>

        {!prevPage ? null : (
            <Paginator url={`/articles/${prevPage}`} type="top" />
        )}

        <div className={'body'}>
            {articles.map((article, i) => {
                const preview = {
                    alt: article.title,
                    src: article.preview.src,
                    srcSet: article.preview.set,
                }

                return (
                    <ArticleCard
                        key={i}
                        article={article}
                        preview={preview}
                    />
                )
            })}
        </div>

        {!nextPage ? null : (
            <Paginator url={`/articles/${nextPage}`} type="bottom" />
        )}
    </div>
)
