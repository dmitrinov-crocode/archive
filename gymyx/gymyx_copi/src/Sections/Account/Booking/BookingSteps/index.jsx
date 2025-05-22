import styles from "./BookingSteps.module.scss"
import BorderLabel from "@/Components/BorderLabel"

const BookingSteps = ({ stepNumber, stepTitle, balance, packageIsActive = false }) => {
  return (
  <div className={styles['wrapper']}>
    <div className={styles["booking-steps"]}>
        <div className={styles["booking-steps__wrapper"]}>
          <p className={styles["booking-steps__tag"]}>шаг {stepNumber}</p>
          <p className={styles["booking-steps__text"]}>{stepTitle}</p>
        </div>
      </div>
    {packageIsActive && (
      <div className={styles['booking-steps__balance']}>{`баланс тренировок: ${(balance > 0) ? balance : 0}`}</div>
    )}
  </div>
  )
}

export default BookingSteps
