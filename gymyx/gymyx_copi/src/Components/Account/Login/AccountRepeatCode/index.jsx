import { useState, useEffect } from "react"
import styles from "./AccountRepeatCode.module.scss"

const INIT_TIMEOUT = 60

const AccountRepeatCode = ({ targetPhone, handleClickChange, handleClick }) => {
  const [timeOut, setTimeOut] = useState(INIT_TIMEOUT)
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeOut > 0) {
        setTimeOut((prevSeconds) => prevSeconds - 1)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [timeOut])

  const handleOnCLick = () => {
    handleClick()
    setTimeOut(INIT_TIMEOUT)
  }

  const handleOnClickChange = () => {
    handleClickChange()
  }

  return (
    <div className={styles["account-repeat-code"]}>
      <div className={styles["account-repeat-code__row"]}>
        <p className={styles["account-repeat-code__text"]}>
          Код поступит на {targetPhone}
        </p>
        <div
          onClick={handleOnClickChange}
          className={styles["account-repeat-code__icon"]}
        >
          <img
            className={styles["account-repeat-code__img"]}
            src="/icons/edit.svg"
            alt=""
          />
        </div>
      </div>
      {timeOut !== 0 && (
        <p className={`${styles["account-repeat-code__text"]}`}>
          Получить повторно через {timeOut} с
        </p>
      )}
      {timeOut === 0 && (
        <p
          onClick={handleOnCLick}
          className={`${styles["account-repeat-code__text"]} ${styles["gray"]} ${styles["underline"]}`}
        >
          Получить повторно
        </p>
      )}
    </div>
  )
}

export default AccountRepeatCode
