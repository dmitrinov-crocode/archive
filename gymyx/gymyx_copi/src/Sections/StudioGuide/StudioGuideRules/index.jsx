import styles from './StudioGuideRules.module.scss'

import Container from '@/Components/Container'
import Image from 'next/image'

const StudioGuideRules = ({data}) => {
  const title = data?.find(el => el.name === 'title')?.value || ''
  const image = data?.find(el => el.name === 'image')?.value || ''
  const rules = data?.find(el => el.type === 'object')?.childrens || []

  return (
    <div className={styles['studio-guide-rules']}>
      <Container>
        <div className={styles['studio-guide-rules__inner']}>
          <h2 className={styles['studio-guide-rules__title']}>{title}</h2>
          <div className={styles['studio-guide-rules__content']}>
            <ul className={styles['studio-guide-rules__rules']}>
              {rules?.map((rule, i) => {
                const title = rule?.find(el => el?.name === 'title')?.value || ''
                const description = rule?.find(el => el?.name === 'description')?.value || ''
                return (
                  <li className={styles['studio-guide-rules__rule']} key={i}>
                    <h3 className={styles['studio-guide-rules__rule-title']}>{title}</h3>
                    <p className={styles['studio-guide-rules__rule-description']}>{description}</p>
                  </li>
                )
              })}
            </ul>
            <Image className={styles['studio-guide-rules__image']} src={image} width={117} height={720} alt='logo'/>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default StudioGuideRules