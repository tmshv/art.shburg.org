import './styles.css'

import cx from 'classnames'
import { dateFormat } from 'src/lib/date'
import { ITag } from 'src/types'
import { TagList, Direction } from '../TagList'
import { useMobile } from 'src/hooks/useMobile'

export type PageMetaProps = {
    style?: React.CSSProperties
    date?: Date
    tags?: ITag[]
}

export const PageMeta: React.FC<PageMetaProps> = props => {
    const mobile = useMobile()
    const center = mobile ? null : 'center'
    const direction: Direction = mobile ? 'vertical' : 'horizontal'

    return (
        <div className={cx('pageMeta', center)} style={props.style}>
            {!props.date ? null : (
                <p className={'date'}>Опубликовано {dateFormat(props.date)}</p>
            )}

            {!(props.tags?.length) ? null : (
                <TagList
                    direction={direction}
                    items={props.tags}
                />
            )}
        </div>
    )
}
