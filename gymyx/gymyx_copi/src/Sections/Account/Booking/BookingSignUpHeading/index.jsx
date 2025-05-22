import Container from "@/Components/Container"
import styles from "./BookingSignUpHeading.module.scss"
import BookingGym from "../BookingGym"

const BookingSignUpHeading = ({
  showButtonEditGym = true,
  handleChangeGym,
  gymTitle,
  headingTitle,
}) => {
  return (
    <section className={styles["booking-sign-up-heading"]}>
      <Container>
        <div className={styles["booking-sign-up-heading__wrapper"]}>
          <p className={styles["booking-sign-up-heading__title"]}>
            {headingTitle}
          </p>
          {showButtonEditGym && (
            <BookingGym 
              classTitle={styles['booking-sign-up-heading__gym']}
              gymTitle={gymTitle}
              handleChangeGym={handleChangeGym}
            />
          )}
        </div>
      </Container>
    </section>
  )
}

export default BookingSignUpHeading
