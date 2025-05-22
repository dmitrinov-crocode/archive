import styles from './BookingGym.module.scss'
import Button from '@/Components/Button'

const BookingGym = ({gymTitle, handleChangeGym, classTitle}) => {
  return (
    <div className={`${styles["booking-sign-up-heading__info"]} ${classTitle}`}>
      <p className={styles["booking-sign-up-heading__info-title"]}>
        {gymTitle}
      </p>
      <Button
      onClick={handleChangeGym}
      variant="blue-gradient"
      label={"Изменить зал"}
      />
    </div>
  )
}

export default BookingGym