import styles from "./BookingCalendarLineItem.module.scss"

const BookingCalendarLineItem = ({
  handleClick,
  id,
  isActive,
  value,
  label,
}) => {
  const handleOnClick = () => {
    handleClick(id)
  }
  return (
    <div
      onClick={handleOnClick}
      className={`${styles["booking-calendar-line-item"]} ${
        isActive && styles["active"]
      }`}
    >
      <p className={styles["booking-calendar-line-item__value"]}>{value}</p>
      <p className={styles["booking-calendar-line-item__label"]}>{label}</p>
    </div>
  )
}

export default BookingCalendarLineItem
