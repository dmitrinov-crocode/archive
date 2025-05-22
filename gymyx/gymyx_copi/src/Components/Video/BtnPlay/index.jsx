import styles from './BtnPlay.module.scss'

const BtnPlay = ({zindex = 0, isShow = true, handlerClick}) => {
  return (
    <div className={`${styles['btn']} ${!isShow ? styles['btn--hidden'] : ''}`} style={{zIndex: zindex}} onClick={handlerClick}>
      <span className={styles['btn__icon']}>
        <svg viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.3619 14.6075C31.6802 15.946 31.6802 19.2922 29.3619 20.6307L5.28858 34.5294C2.97025 35.8679 0.0723305 34.1948 0.0723305 31.5178L0.0723305 3.72037C0.0723305 1.04339 2.97025 -0.62972 5.28858 0.70877L29.3619 14.6075Z" fill="white"/>
        </svg>
      </span>
    </div>
  )
}

export default BtnPlay