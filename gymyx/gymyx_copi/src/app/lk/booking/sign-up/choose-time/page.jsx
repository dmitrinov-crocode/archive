'use client';

import BookingSignUpHeading from '@/Sections/Account/Booking/BookingSignUpHeading';
import BookingSignUpTags from '@/Sections/Account/Booking/BookingSignUpTags';
import BookingSignUpContent from '@/Sections/Account/Booking/BookingSignUpContent';
import BookingSteps from '@/Sections/Account/Booking/BookingSteps';
import NavigationBack from '@/Sections/Account/NavigationBack';
import BookingTimePricing from '@/Sections/Account/Booking/BookingTimePricing';
import { getUserData } from '@/Utils/updateDataUser';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const variants = [
  { value: '00:00', bgColor: '#7B92FF' },
  { value: '08:00', bgColor: '#294AE7' },
  { value: '13:00', bgColor: '#1E318A' },
  { value: '19:00', bgColor: '#061641' },
];

const ChooseTime = () => {
  const { data: sessionData } = useSession();
  const { gym, visitDate, avaliableTimesCurrentDay } = useSelector((state) => state.booking);
  const [pricesVariants, setPricesVariants] = useState([]);
  const [balance, setBalance] = useState({
    full_balance: 0,
    count_bacance: 0,
  })
  const [priceVariant, setPricesVariant] = useState({
    first: [],
    default: []
  })

  const setCountBalace = () => {
    const countTime = visitDate.reduce((acc, el) => acc + el.time.length, 0)
    setBalance(prev => ({
      ...prev,
      count_bacance: prev.full_balance - countTime
    }))
  }

  useEffect(() => {
    if(sessionData?.user?.accessToken)
    getUserData(sessionData?.user?.accessToken)
    .then(res => {
      if(res?.data) {
        setBalance(prev => ({
          ...prev,
          full_balance: res?.data?.balance,
        }))
        setCountBalace()
      }
    })
  }, [sessionData])

  useEffect(() => {
    if (gym?.prices && sessionData) {
      let variantsTemp = [];

      variantsTemp = gym.prices.map((item, index) => {
        return { ...item, bgColor: variants[index]?.bgColor };
      });

      // if (!sessionData.user.is_new) {
      //   // not new user
      //   // if (checkIsOnlyTraining(visitDate)) {
      //   //   // first training
      //   //   variantsTemp = gym.prices.map((item, index) => {
      //   //     return { ...item, bgColor: variants[index]?.bgColor };
      //   //   });
      //   // } else {
      //     // now first training
      //     variantsTemp = gym.prices.map((item, index) => {
      //       return { ...item, bgColor: variants[index]?.bgColor };
      //     });
      //   // }
        
      // } else {
      //   // new user
      //   // if (!checkIsOnlyTraining(visitDate)) {
      //     // now first training
      //     variantsTemp = gym.prices.map((item, index) => {
      //       return { ...item, bgColor: variants[index]?.bgColor };
      //     });
      //   // } else {
      //   //   //first training
      //   //   variantsTemp = [
      //   //     {
      //   //       start: '00:00:00',
      //   //       end: '23:00:00',
      //   //       price: gym?.min_price,
      //   //       bgColor: variants[0]?.bgColor,
      //   //     },
      //   //   ];
      //   // }
      // } 
      setPricesVariants(variantsTemp);
      setCountBalace()
    }
  }, [gym, sessionData, visitDate]);

  return (
    <>
      <NavigationBack buttonLabel={'Вернуться к выбору дней'} link={'/lk/booking/sign-up'} />
      <BookingSignUpHeading showButtonEditGym={false} headingTitle={'Запишитесь на тренировки'} />
      <BookingSignUpTags change={false} setPricesVariant={setPricesVariant}/>
      <BookingSignUpContent gymIsShow={false}>
        <BookingTimePricing variants={pricesVariants} change={false} priceVariant={priceVariant}/>
        <BookingSteps stepNumber={2} stepTitle={'Выберите время'} balance={balance.count_bacance} packageIsActive={balance.full_balance > 0}/>
      </BookingSignUpContent>
    </>
  );
};

export default ChooseTime;
