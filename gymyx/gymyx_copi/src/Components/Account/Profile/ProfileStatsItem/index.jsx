import styles from "./ProfileStatsItem.module.scss";

const ProfileStatsItem = ({ label, count, isCurrent }) => {
  return (
    <div className={styles["profile-stats-item"]}>
      <div className={styles["profile-stats-item__panel"]}>
        <div
          style={{ "--percent": `${count * 5}%` }}
          className={`${styles["profile-stats-item__column"]} ${
            isCurrent ? styles["isCurrent"] : ""
          } `}
        ></div>
        <div className={styles["profile-stats-item__column-text"]}>{label}</div>
      </div>
      <p className={styles["profile-stats-item__count"]}>{count}</p>
    </div>
  );
};

export default ProfileStatsItem;
