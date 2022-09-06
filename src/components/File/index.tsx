import s from './styles.module.css'

import { FileDefinition } from 'src/types'
import { ext, size } from 'src/lib/file'
import Link from 'next/link'

export type FileProps = FileDefinition & {
    style?: React.CSSProperties
}

export const File: React.SFC<FileProps> = props => (
    <div className={s.file} style={props.style}>
        {!props.cover?.src ? null : (
            <div className={s.image}>
                <Link href={props.file.src} >
                    <a target="_blank" rel="noreferrer" className="invisible">
                        <img src={props.cover.src} alt={props.name} />
                    </a>
                </Link>
            </div>
        )}

        <div className={s.info}>
            <span>{props.name}</span>
            <Link href={props.file.src} >
                <a target="_blank" rel="noreferrer">
                    {ext(props.file.type)} ({size(props.file.size)})
                </a>
            </Link>
        </div>
    </div>
)
