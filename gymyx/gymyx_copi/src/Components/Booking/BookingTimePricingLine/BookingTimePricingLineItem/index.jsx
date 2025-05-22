"use client"

import { useEffect, useState } from "react"
import styles from "./BookingTimePricingLineItem.module.scss"

const BookingTimePricingLineItem = ({ value, bgColor }) => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className={styles["booking-time-pricing-line-item"]}>
      <p
        style={{ "--bg-color": bgColor }}
        className={styles["booking-time-pricing-line-item__value"]}
      >
        {value} ₽/{windowWidth < 992 ? <span>ч</span> : <span>час</span>}
      </p>
    </div>
  )
}

export default BookingTimePricingLineItem
