import styles from "./PricesListTimeLine.module.scss"

const PricesListTimeLine = ({ value }) => {
  return (
    <div className={styles["prices-list-timeline__time-line-item"]}>
    <div className={styles["prices-list-timeline__time-line-item-dot"]}>
      <p className={styles["prices-list-timeline__time-line-item-value"]}>{value}</p>{" "}
    </div>
  </div>
  )
}

export default PricesListTimeLine
