'use client';

import styles from "./BookingTimePricingLine.module.scss"
import BookingTimePricingLineItem from "./BookingTimePricingLineItem"
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const BookingTimePricingLine = ({ variants, priceVariant, isChange = false }) => {
  const { visitDate, gym } = useSelector((state) => state.booking)
  const dateLength = visitDate.reduce((acc, el) => acc + el.time.length, 0)
  const { data: sessionData } = useSession();
  // console.log(priceVariant)
  // console.log(sessionData?.user?.is_new)

  const variantPrices = [
    {name: 'Ночь', price: gym.prices[0].price, color: '#7B92FF'},
    {name: 'Утро', price: gym.prices[1].price, color: '#294AE7'},
    {name: 'День', price: gym.prices[2].price, color: '#1E318A'},
    {name: 'Вечер', price: gym.prices[3].price, color: '#061641'},
  ]

  const firstVariantPrice = [
    {name: 'Ночь', price: priceVariant?.first[0]?.price || 0, color: '#7B92FF'},
  ]

  function updatePrices(baseArray, updates) {
    const updatesMap = new Map(updates.map(item => [item.name, item.price]));
  
    return baseArray.map(item => ({
      ...item,
      price: updatesMap.has(item.name) ? updatesMap.get(item.name) : item.price,
    }));
  }

  return (
    <div className={styles["booking-time-pricing-line"]}>
      {isChange ? (
        variants.map(({ price, bgColor }) => (
          <BookingTimePricingLineItem
            key={price}
            bgColor={bgColor}
            value={price}
          />
        ))
      ) : (
        (!dateLength && sessionData?.user?.is_new) || sessionData?.user?.is_fix ? (
          firstVariantPrice.map(({price, color}) => (
            <BookingTimePricingLineItem
              key={price}
              bgColor={color}
              value={price}
            />
          ))
        ) : (!dateLength ? (
            updatePrices(variantPrices, priceVariant.first).map(({price, color}) => (
              <BookingTimePricingLineItem
                key={price}
                bgColor={color}
                value={price}
              />
            ))
          ) : (
            updatePrices(variantPrices, priceVariant.default).map(({price, color}) => (
              <BookingTimePricingLineItem
                key={price}
                bgColor={color}
                value={price}
              />
            ))
          ))
      )}  
    </div>
  )
}

export default BookingTimePricingLine
