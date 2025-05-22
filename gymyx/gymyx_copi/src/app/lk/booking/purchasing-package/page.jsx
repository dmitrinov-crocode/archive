'use client';

import BookingSignUpHeading from "@/Sections/Account/Booking/BookingSignUpHeading"
import NavigationBack from "@/Sections/Account/NavigationBack"
import BookingPackages from "@/Sections/Account/Booking/BookingPackages"
import { useState } from "react"
import { useSelector } from "react-redux"
import Loading from "@/Components/Loading"

const PurchasingPackages = () => {
  const { gym } = useSelector((state) => state.booking);
  const [loadIsShow, setLoadIsShow] = useState(true)

  return (
    <>
    {loadIsShow && <Loading full_screen={true}/>}
    
    <NavigationBack buttonLabel={'Назад'} link={'/lk/booking'} />
    <BookingSignUpHeading
        handleChangeGym={() => {}}
        gymTitle={gym?.name}
        headingTitle={'Выберите пакет тренировок'}
        showButtonEditGym={false}
      />
    <BookingPackages setLoadIsShow={setLoadIsShow}/>
    </>
  )
}

export default PurchasingPackages