import Container from "@/Components/Container"
import styles from "./ProfileContactOptions.module.scss"

const ProfileContactOptions = ({ children }) => {
  return (
    <section className={styles["profile-contacts-options"]}>
      <Container size="M">
        <div className={styles["profile-contacts-options__wrapper"]}>{children}</div>
      </Container>
    </section>
  )
}

export default ProfileContactOptions
