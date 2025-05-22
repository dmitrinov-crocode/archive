import styles from "./BookingSignUpContent.module.scss"
import Container from "@/Components/Container"
import BookingGym from "../BookingGym"

const BookingSignUpContent = ({ children, gymTitle, handleChangeGym, gymIsShow = true}) => {
  return (
    <section className={styles["booking-signup-content"]}>
      <Container>
        <div className={styles["booking-signup-content__wrapper"]}>
          {children}
        </div>
        {gymIsShow && (
          <BookingGym 
            classTitle={styles['booking-signup-content__gym']}
            gymTitle={gymTitle}
            handleChangeGym={handleChangeGym}
          />
        )}
      </Container>
    </section>
  )
}

export default BookingSignUpContent
