import styles from './PackagesHeader.module.scss'

import PackagesTagItem from '../PackagesTagItem'
import Container from '@/Components/Container'

const PackagesHeader = ({packagesData, packageIdActive, setPackageIdActive}) => {

  const handlerClick = (id) => {
    setPackageIdActive(id)
  }

  return (
    <section className={styles['package-header']}>
      <div className={styles['package-header__inner']}>
      <Container classTitle={styles['container']}>
        <div className={styles['package-header__items']}>
          {packagesData.map((packageItem, i) => (
            <PackagesTagItem 
              isOnly={!!packageItem?.only_one}
              id={i} 
              name={packageItem.name} 
              isActive={packageIdActive == i} 
              key={i} 
              handlerClick={handlerClick}/>
            ))}
          <div className={styles['last']}>x</div>
        </div>
      </Container>
      </div>
    </section>
  )
}

export default PackagesHeader