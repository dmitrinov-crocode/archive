import styles from "./BorderLabel.module.scss"

const BorderLabel = ({label}) => {
  return (
    <div className={styles['border-label']}>
      <div className={styles['border-label__title']}>{label}</div>
    </div>
  )
}

export default BorderLabel
