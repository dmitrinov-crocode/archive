'use client'

import styles from "./BookingTimeVariantsItem.module.scss"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const BookingTimeVariantsItem = ({
  handleClick,
  disabled,
  isActive,
  bgColor,
  value,
  variants,
  isChange,
  priceVariant
}) => {
  const [bg, setBg] = useState(bgColor)
  const { visitDate } = useSelector((state) => state.booking);
  const { data: sessionData } = useSession();
  const dateLength = visitDate.reduce((acc, el) => acc + el.time.length, 0)

  const handleOnClick = () => {
    handleClick(value)
  }

  function getBgColorByPrice(price, variants) {
    const element = variants.find(el => price === el.price)
    if(element) return element.color
    else return 'blue'
  }

  useEffect(() => {
    if(!isChange) {
      if(sessionData.user.is_new && !dateLength) {
        setBg('#7B92FF')
      } else {
        const firstPrice = value?.price?.first
        const defaultPrice = value?.price?.default
        if(!dateLength && firstPrice) {
          setBg(getBgColorByPrice(firstPrice, priceVariant.first))
        } else if(dateLength && defaultPrice) {
          setBg(getBgColorByPrice(defaultPrice, priceVariant.default))
        } 
      }
    }
  }, [visitDate])

  return (
    <div
      disabled
      onClick={handleOnClick}
      style={{ background: bg }}
      className={`${styles["booking-time-variants-item"]} ${
        isActive ? styles["active"] : ""
      } ${disabled ? styles["disabled"] : ""}`}
    >
      {value?.time ?? value}
    </div>
  )
}

export default BookingTimeVariantsItem
