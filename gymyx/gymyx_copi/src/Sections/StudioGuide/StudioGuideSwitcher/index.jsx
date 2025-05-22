import styles from './StudioGuideSwitcher.module.scss'

import Switcher from '@/Components/Switcher'
import Container from '@/Components/Container'

const StudioGuideSwitcher = ({data, handlerClick, activeId = 0}) => {
  return (
    <section className={styles['studio-guide-switcher']}>
      <Container>
        <div className={styles['studio-guide-switcher__inner']}>
          <Switcher data={data} handlerClick={handlerClick} activeId={activeId}/>
        </div>
      </Container>
    </section>
  )
}

export default StudioGuideSwitcher