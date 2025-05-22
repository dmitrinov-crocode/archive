import styles from './PackagesSummary.module.scss'
import Button from '@/Components/Button'

const PackagesSummary = ({packageData, handlerSubmit, submitSplit}) => {
  const workoutsNumber = packageData?.count || 0
  const result = packageData?.price?.full || 0

  return (
    <section className={styles["packages-summary"]}>
      <div className={styles["packages-summary__inner"]}>
        <div className={styles['packages-summary__shopping-list']}>
          <p className={styles['packages-summary__shopping-item']}>Пакет на {workoutsNumber} тренировок</p>
        </div>
        <div className={styles['packages-summary__result']}>
          <span className={styles['packages-summary__result-text']}>Итого</span>
          <span className={styles['packages-summary__result-price']}>{result}₽</span>
        </div>
        <div className={styles['packages-summary__buttons']}>
          <Button
            onClick={handlerSubmit}
            size="l"
            variant="blue-gradient"
            fullSize={true}
            label={'Оплатить'}
            icon={'arrow'}
            disabledShadow={true}
          />
          <Button
            onClick={submitSplit}
            size="l"
            variant="light-blue-gradient"
            fullSize={true}
            label={'Оплатить'}
            icon={'split'}
            disabledShadow={true}
          />
        </div>
      </div>
    </section>
  )
}

export default PackagesSummary