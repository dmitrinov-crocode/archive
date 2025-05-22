'use client';

import BookingTimePricingLine from '@/Components/Booking/BookingTimePricingLine';
import BookingTimeVariants from '@/Components/Booking/BookingTimeVariants';
import Button from '@/Components/Button';
import styles from './BookingTimePricing.module.scss';
import { useEffect, useState } from 'react';
import { updateBookingVisitDate } from '@/redux/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkData, prepareVisitDateWithTime } from './helpers';
import { useSession } from 'next-auth/react';
import { transferTraining } from './helpers';

const BookingTimePricing = ({ variants = [], change = false, setModaldata, setIsLoad, priceVariant }) => {
  const dispatch = useDispatch();
  const { visitDate, currentDate, loading, avaliableTimesCurrentDay } = useSelector((state) => state.booking);
  const { oldId } = useSelector((state) => state.transfer);
  const [data, setData] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const { data: sessionData } = useSession();
  const router = useRouter();

  const handleChangeData = (value) => {
    if(change) {
      if (!data.some(time => time === value)) {
        setData([value])
      } else {
        setData(data.filter((item) => item !== value));
      }
    } else {
      if (!data.some(item => item.time === value.time)) {
        setData([...data, value]);
      } else {
        setData(data.filter((item) => item.time !== value.time));
      }
    }
  };

  const handleSubmit = () => {
    if(change) {
      setIsLoad(true)
      setCanSubmit(false)
      const value = visitDate[0].value
      const time = visitDate[0].time[0]
      if(value) {
        const avalibleData = (num) => num > 9 ? num : '0'+num 
        const date = `${value.getFullYear()}-${avalibleData(value.getMonth()+1)}-${value.getDate()}`
        transferTraining(sessionData.user.accessToken, oldId, date, time)
        .then(res => {
          if(res?.data?.message === "Practice has been rescheduled") {
            setModaldata((prevData) => ({
              ...prevData,
              type: 'completed',
              text: 'Ваша тренировка успешно перенесена!',
              isShow: true
            }))
          } else if(res?.data?.message === 'Less than 4 hours before the specified time') {
            setModaldata((prevData) => ({
              ...prevData,
              type: 'less',
              text: 'Перенос не возможен! Менее чем за 4 часа до указанного времени',
              isShow: true
            }))
          } else {
            setModaldata((prevData) => ({
              ...prevData,
              type: 'error',
              text: 'Что то пошло не так, попробуйте позже =(',
              isShow: true
            }))
          }
          setCanSubmit(true)
          setIsLoad(false)
        })
      }
    }
    else {
      router.push('/lk/checkout');
    }
  };

  useEffect(() => {
    let tempData = [];
    if (!!visitDate[currentDate]?.time) {
      tempData = visitDate[currentDate]?.time;
    }
    setData(tempData);
  }, [currentDate, sessionData]);

  useEffect(() => {
    const result = prepareVisitDateWithTime(visitDate[currentDate], data);
    const updatedVisitDate = [...visitDate];
    updatedVisitDate[currentDate] = result;
    dispatch(updateBookingVisitDate(updatedVisitDate));
    setCanSubmit(checkData(updatedVisitDate));
  }, [data, sessionData, avaliableTimesCurrentDay]);

  return (
    <section className={styles['booking-time-pricing']}>
      <div className={styles['booking-time-pricing__wrapper']}>
        <BookingTimePricingLine variants={variants} priceVariant={priceVariant} isChange={change}/>
        <BookingTimeVariants loading={loading} data={data} onChangeData={handleChangeData} variants={variants} isChange={change} priceVariant={priceVariant}/>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          size="l"
          variant="blue-gradient"
          fullSize={true}
          label={'Забронировать'}
        />
      </div>
    </section>
  );
};

export default BookingTimePricing;
