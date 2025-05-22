'use client'

import { formatDate, formatTime } from "@/Utils/helpers";
import styles from "./BookingCard.module.scss";
import { useEffect, useState } from "react";

const BookingCard = ({
  id,
  isSingle,
  onClickDelete,
  onClickChangeTraining,
  date = "",
  time = "",
  gymTitle = "",
  address = "",
  older = false,
  transferIsShow = true,
  isTraining = false,
  modalType = () => {}
  
}) => {
  time = isTraining ? time : time.time
  const [transferIsDisabled, setTransferIsDisabled] = useState(false)

  const handleClickRemove = () => {
    if(transferIsShow) {
      const less4Hours = isDifferenceMoreThan4Hours(date, time)
      modalType(less4Hours ? 'confirmation' : 'delete')
    }
    
    onClickDelete(id);
  };

  useEffect(() => {
    if (transferIsShow) setTransferIsDisabled(isDifferenceMoreThan4Hours(date, time))
  }, [transferIsShow])

  const handlerClickChange = () => {
    setTransferIsDisabled(isDifferenceMoreThan4Hours(date, time))
    if(transferIsDisabled) modalType('transfer')
    else onClickChangeTraining(id, date, time)
  }

  const isDifferenceMoreThan4Hours = (dateStr, timeStr) => { 
    const dateTime = new Date(`${dateStr}T${timeStr}`);
    const nowTime = new Date();
  
    const differenceInMs = dateTime - nowTime;
    const differenceInHours = differenceInMs / (1000 * 60 * 60);
    return (differenceInHours < 4)
  }

  return (
    <div
      className={`${styles["booking-card"]} ${older ? styles["older"] : ""}`}
    >
      <div className={styles["booking-card__wrapper"]}>
        <div className={styles["booking-card__content"]}>
          <div className={styles["booking-card__heading"]}>
            <p className={styles["booking-card__heading-title"]}>
              {date ? formatDate(date) : ""}
            </p>
            <p className={styles["booking-card__heading-text"]}>
              {time ? formatTime(time) : ""}
            </p>
          </div>
          <p className={styles["booking-card__title"]}>{gymTitle}</p>
          <p className={styles["booking-card__text"]}>{address}</p>
        </div>

        {!older && (
          <div className={styles["booking-card__aside"]}>
          {!isSingle && (
            <div className={styles["booking-card__aside-btn"]} onClick={handleClickRemove}>
              <img src="/icons/cross.svg" alt="" />
            </div>
          )}

          <button className={`
            ${styles["booking-card__aside-btn-transfer"]} 
            ${!transferIsShow ? styles["booking-card__aside-btn-transfer--hidden"] : ''}
            ${transferIsDisabled ? styles["booking-card__aside-btn-transfer--disabled"] : ''}`} type="button"
            onClick={handlerClickChange}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 42" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M26.1544 13.8711L32.7932 12.521C29.1039 8.1411 23.1224 5.97812 17.187 7.44409C11.5897 8.82654 7.45871 13.0842 5.97807 18.256L1.79057 17.3083C3.62283 10.6052 8.93363 5.06642 16.159 3.28186C23.701 1.41908 31.3013 4.14769 36.0142 9.6889L34.7777 1.5299L38.4868 0.967804L40.5779 14.7661L26.9019 17.5473L26.1544 13.8711ZM15.2122 27.1571L8.73444 29.1662C12.4077 33.6877 18.4854 35.9441 24.5157 34.4547C30.1129 33.0722 34.2439 28.8146 35.7246 23.6427L39.9121 24.5905C38.0798 31.2936 32.769 36.8324 25.5437 38.6169C18.0826 40.4597 10.5644 37.8091 5.84114 32.3873L7.86568 40.2985L4.2314 41.2285L0.771484 27.7083L14.1009 23.5741L15.2122 27.1571Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        )}
        
      </div>
    </div>
  );
};

export default BookingCard;
