
import styles from './GideTags.module.scss'

import { CrossIcon } from '../../../../public/svg'

const GideTags = ({activeTags = [], deleteTagHandler}) => {

  return (
    <div className={`${styles['select-tags']} ${!activeTags.length ? styles['select-tags--hidden'] : ''}`}>
      <div className={styles['select-tags__inner']}>
        {activeTags.map((tag, i) => (
          <div className={styles['select-tags__item']} key={i}>
            <span className={styles['select-tags__name']}>{tag}</span>
            <button type='bytton' className={styles['select-tags__delete-icon']} onClick={() => deleteTagHandler(tag)}><CrossIcon/></button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GideTags