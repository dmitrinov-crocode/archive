import styles from "./ProfileLogout.module.scss"

const ProfileLogout = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className={styles["profile-logout"]}>
      <p className={styles["profile-logout__text"]}>Выйти</p>
      <div className={styles["profile-logout__icon"]}>
        <img
          className={styles["profile-logout__img"]}
          src="/icons/logout.svg"
          alt=""
        />
      </div>
    </button>
  )
}

export default ProfileLogout
