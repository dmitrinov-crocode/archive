import { formatDate } from "@/Utils/helpers"
import styles from "./BookingSignUpTagsItem.module.scss"

const BookingSignUpTagsItem = ({
  onClick,
  onDelete,
  isActive = false,
  value,
  isLonely = false,
}) => {
  return (
    <div
      className={`${styles["booking-sign-up-tags-item"]} ${
        styles[isActive ? "active" : ""]
      }`}
    >
      <p
        onClick={() => onClick(value)}
        className={styles["booking-sign-up-tags-item__value"]}
      >
        {formatDate(value)}
      </p>
      <div
        style={{ visibility: isLonely ? "hidden" : "visible" }}
        onClick={() => onDelete(value)}
        className={styles["booking-sign-up-tags-item__btn"]}
      >
        <img src="/icons/cross.svg" alt="cross image btn" />
      </div>
    </div>
  )
}

export default BookingSignUpTagsItem
