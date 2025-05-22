import styles from "./ProfileBlockTitle.module.scss"

const ProfileBlockTitle = ({ label }) => {
  return <p className={styles["profile-block-title"]}>{label}</p>
}

export default ProfileBlockTitle
