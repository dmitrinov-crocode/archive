import styles from './Checkbox.module.scss';

const Checkbox = ({ isActive, toggleActive, label, loading }) => {
  return (
    <div onClick={toggleActive} className={loading ? styles.checkbox__disable : styles.checkbox}>
      <div className={styles.checkbox__icon}>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="21" height="21" rx="6" strokeWidth="2" />
          {isActive && <path d="M6 11.2308L10.4 17L17 7" strokeWidth="2" strokeLinejoin="bevel" />}
        </svg>
      </div>
      <p className={styles.checkbox__label}>{label}
        {label == 'Не получать' && (
          <span> рассылку</span>
        )}
      </p>
    </div>
  );
};

export default Checkbox;
