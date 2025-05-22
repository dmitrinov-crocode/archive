import styles from './GideSwitcher.module.scss'

import Container from '@/Components/Container'
import Switcher from '@/Components/Switcher'

const GideSwitcher = ({data, handlerClick, activeId = 0}) => {

  return (
    <div className={styles['gide-switcher']}>
      <Container size='xl'>
        <Switcher data={data} handlerClick={handlerClick} activeId={activeId}/>
      </Container>
    </div>
  )
}

export default GideSwitcher