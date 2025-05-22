import styles from './SliderControls.module.scss';

const SliderControls = ({ handlePrevSlide, handleNextSlide, activeSlide = 0, countSlides, isTrainers, isShowCount = true }) => {
  return (
    <div className={styles['slider-controls']}>
      {isShowCount && 
        (isTrainers ? (
          <p className={styles['slider-controls__counter-trainers']}>
            {activeSlide}/{countSlides}
          </p>
        ) : (
          <p className={styles['slider-controls__counter']}>
            {activeSlide}/{countSlides}
          </p>
        ))
      }
      

      <div className={styles['slider-controls__btns']}>
        {isTrainers ? (
          <>
            <button
              onClick={handlePrevSlide}
              className={styles['slider-controls__btn-trainers']}
              aria-label="Предыдущий слайд"
            >
              <img src="/icons/arrow.svg" alt="arrow-prev" width={30} height={30} />
            </button>
            <button
              onClick={handleNextSlide}
              className={`${styles['slider-controls__btn-trainers']} ${styles['slider-controls__btn-right']}`}
              aria-label="Следующий слайд"
            >
              <img src="/icons/arrow.svg" alt="arrow-next" width={30} height={30} />
            </button>
          </>
        ) : (
          <>
            <button onClick={handlePrevSlide} className={styles['slider-controls__btn']} aria-label="Предыдущий слайд">
              <img src="/icons/arrow.svg" alt="arrow-prev" width={30} height={30} />
            </button>
            <button
              onClick={handleNextSlide}
              className={`${styles['slider-controls__btn']} ${styles['slider-controls__btn-right']}`}
              aria-label="Следующий слайд"
            >
              <img src="/icons/arrow.svg" alt="arrow-next" width={30} height={30} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SliderControls;
