import Image from 'next/image'
import { ImageSize, PageCardData } from 'src/types'
import { CardGrid } from '../CardGrid'
import { Card, CardLayout } from '../Card'
import { Date } from './Date'
import { Block } from '../Block'
import { Spacer } from '../Spacer'
import { imageSrcSet, imageSrc } from 'src/lib/image'
import { Button } from '../Button'
import { useState, useCallback } from 'react'

export type PageGridProps = {
    items: PageCardData[]
}

export const PageGrid: React.FC<PageGridProps> = props => {
    return (
        <CardGrid
            style={{
                marginBottom: 'var(--size-m)',
            }}
        >
            {props.items.map(item => {
                const gridColumn = item.featured ? 'span 2' : 'auto'
                const layout: CardLayout = item.featured ? 'featured' : 'simple'

                const content = !item.featured
                    ? (
                        <Block
                            direction={'vertical'}
                        >
                            {item.title}
                            <Spacer />
                            {!item.date ? null : (
                                <Date style={{
                                    marginTop: 'var(--size-m)',
                                }}>{item.date}</Date>
                            )}
                        </Block>
                    ) : (
                        item.title
                    )

                return (
                    <Card
                        key={item.id}
                        href={item.url}
                        cover={(
                            <Image
                                layout={'fill'}
                                objectFit={'cover'}
                                src={item.cover.src}
                            />
                        )}
                        layout={layout}
                        style={{
                            gridColumn,
                        }}
                    >
                        {content}
                    </Card>
                )
            })}
        </CardGrid>
    )
}
