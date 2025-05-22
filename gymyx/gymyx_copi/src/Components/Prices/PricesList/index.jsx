import styles from "./PricesList.module.scss"
import PricesListItem from "./PricesListItem"
import PricesListTimeLine from "./PricesListTimeLine"

const PricesList = ({ items }) => {
  return (
    <div className={styles["prices-list"]}>
      <div className={styles["prices-list__col"]}>
        {items.slice(0, 2).map(({ value }) => (
          <PricesListItem key={value} value={value} />
        ))}
      </div>
      <div className={styles["prices-list__time-line"]}>
        <PricesListTimeLine value="00:00" />
        <PricesListTimeLine value="07:00" />
        <PricesListTimeLine value="12:00" />
        <PricesListTimeLine value="18:00" />
        <PricesListTimeLine value="24:00" />
      </div>
      <div
        className={`${styles["prices-list__col"]} ${styles["prices-list__col-right"]}`}
      >
        {items.slice(2).map(({ value }) => (
          <PricesListItem key={value} value={value} />
        ))}
      </div>
    </div>
  )
}

export default PricesList
