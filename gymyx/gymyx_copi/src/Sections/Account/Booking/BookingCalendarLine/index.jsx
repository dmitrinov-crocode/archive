"use client"

import { useEffect, useState } from "react"
import Container from "@/Components/Container"
import styles from "./BookingCalendarLine.module.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import BookingCalendarLineItem from "@/Components/Booking/BookingCalendarLineItem"
import { generateBookingDates } from "@/Utils/helpers"

const sliderSettings = {
  spaceBetween: 6,
  slidesPerView: 5,

  breakpoints: {
    560: {
      spaceBetween: 12,
      slidesPerView: 6,
    },

    992: {
      spaceBetween: 45,
      slidesPerView: 7,
    },
  },
}

const BookingCalendarLine = () => {
  const [slider, setSlider] = useState()
  const [dates, setDates] = useState()
  const [activeIndexSlide, setIndexActiveSlide] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)

  const nextSlide = () => {
    slider.slideNext()
    setIndexActiveSlide(slider.activeIndex + 1)
  }

  const prevSlide = () => {
    slider.slidePrev()
    setIndexActiveSlide(slider.activeIndex + 1)
  }

  const onChangeSlide = (e) => {
    setIndexActiveSlide(e.activeIndex + 1)
  }

  const handleInit = (e) => {
    setSlider(e)
  }

  const handleToggleSelectedDate = (index) => {
    setSelectedDate(dates[index])
  }

  useEffect(() => {
    const datesTemp = generateBookingDates(31)
    setDates(datesTemp)
    setSelectedDate(datesTemp[0])
  }, [])

  return (
    <section className={styles["booking-calendar-line"]}>
      <Container>
        <div className={styles["booking-calendar-line__wrapper"]}>
          <p className={styles["booking-calendar-line__title"]}>
            {selectedDate?.month?.label}
          </p>
          <div className={styles["booking-calendar-line__slider"]}>
            <button
              disabled={activeIndexSlide === 1}
              onClick={prevSlide}
              className={`${styles["booking-calendar-line__btn"]} ${styles["prev"]}`}
            >
              <img src="/icons/arrow-2.svg" alt="" />
            </button>
            <div className={styles["booking-calendar-line__slider-wrapper"]}>
              {dates && (
                <Swiper
                  className={`swiper-container`}
                  onSlideChange={onChangeSlide}
                  onSwiper={handleInit}
                  {...sliderSettings}
                >
                  {dates.map(({ id, dayOfMonth, dayOfWeek, month }) => (
                    <SwiperSlide key={`${dayOfMonth}_${month.number}`}>
                      <BookingCalendarLineItem
                        handleClick={handleToggleSelectedDate}
                        value={dayOfMonth}
                        id={id}
                        isActive={selectedDate.id === id}
                        label={dayOfWeek}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <button
              disabled={
                dates?.length ===
                activeIndexSlide + slider?.params?.slidesPerView - 1
              }
              onClick={nextSlide}
              className={`${styles["booking-calendar-line__btn"]} ${styles["next"]}`}
            >
              <img src="/icons/arrow-2.svg" alt="" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default BookingCalendarLine
