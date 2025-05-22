import styles from './PackagesCard.module.scss'

const PackagesCard = ({packageData}) => {

  const name = packageData?.name || ''
  const count = packageData?.count || 0
  const savingPrice = packageData?.saving?.price || 0
  const savingTraining = packageData?.saving?.training || 0
  const workout = Array.from({length: count})
  const description = (packageData?.description || '')
  const fullPrice = packageData?.price?.full || 0
  const price = Math.round(fullPrice / count) || 0

  return (
      <section className={styles['packages-card']}>
        <div className={styles['packages-card__inner']}>
          <span className={styles['packages-card__name']}>{name}</span>
          <span className={styles['packages-card__price']}>{price} ₽/тренировка</span>
          {description && (
            <ol className={styles['packages-card__description-list']}>
              {description.replace(/^\s+|\s+$/g, '').split(';').map((text, i) => <li className={styles['packages-card__description-item']} key={i}>{text}</li>)}
            </ol>
          )}
          
          <span className={styles['packages-card__benefit']}>выгоднее на {savingPrice}₽</span>
          <div className={styles['packages-card__workout-list']}>
            {workout.map((_, i) => 
              (i < workout.length - savingTraining)
              ? <div className={styles['packages-card__workout-item']} key={i}>{i+1}</div>
              : <div className={styles['packages-card__workout-item--last']} key={i}> </div>
            )}
          </div>
        </div>
      </section>
  )
}

export default PackagesCard