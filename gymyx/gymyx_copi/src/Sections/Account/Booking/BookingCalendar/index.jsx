'use client';

import styles from './BookingCalendar.module.scss';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { useState, useEffect } from 'react';
import Button from '@/Components/Button';
import { updateBookingData } from '@/redux/bookingSlice';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/Components/Loading';
import { compareDates, takeAvailableDatesTwoMonth } from './helpers';
import { useSession } from "next-auth/react";
import { setTrainingData } from '@/redux/transferTrainingData';

addLocale('ru', {
  firstDayOfWeek: 1,
  showMonthAfterYear: true,
  dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  dayNamesShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  dayNamesMin: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  monthNames: [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ],
  monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  today: 'Сегодня',
  clear: 'Очистить',
});

const BookingCalendar = ({change = false, userIsFix = false}) => {
  const [loading, setLoading] = useState(true);
  const { gym, visitDate, variant } = useSelector((state) => state.booking);
  const { date } = useSelector((state) => state.transfer);
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);
  const router = useRouter();
  const [availableDates, setAvailableDates] = useState([]);
  const { data: sessionData } = useSession();

  const handleSubmit = () => {
      dispatch(
        updateBookingData({
          visitDate: [...dates]?.sort(compareDates),
          currentDate: 0,
        }),
      );

    if(change) {
      router.push('/lk/booking/change-trainitg/change-time');
    } else {
      router.push('/lk/booking/sign-up/choose-time');
    }
  };

  const handleAddDate = (e) => {
    const value = e.value;

    const getTime = (valueToFind) => {
      try {
        return dates.filter(({ value }) => value.toString() == valueToFind.toString())[0];
      } catch {
        return false;
      }
    };

    let newDates = value.map((valueItem) => {
      const time = getTime(valueItem);
      return {
        value: valueItem,
        time: time?.time || [],
      };
    });

    if(change) {
      newDates = (newDates.at(-1)) ? [newDates.at(-1)] : []
    }

    setDates(newDates);
  };

  useEffect(() => {
    setLoading(true);
    if (!!visitDate?.length) {
      setDates(visitDate);
    }

    if(sessionData?.user?.accessToken) {
      takeAvailableDatesTwoMonth(sessionData.user.accessToken, gym.id)
      .then((data) => {
        setAvailableDates(data);
        setLoading(false);
      });
    }
  }, [gym, sessionData]);

  // if (loading) {
    // return <Loading />;
  // }

  return (
    <div className={styles['booking-calendar']}>
      <div>
        {loading 
        ? <Loading /> 
        : <Calendar
          minDate={new Date()}
          className={`${styles['booking-calendar__calendar']} booking-calendar__calendar`}
          value={dates?.map(({ value }) => new Date(value))}
          onChange={handleAddDate}
          inline
          locale="ru"
          selectionMode="multiple"
          maxDateCount={variant === 'single' ? 1 : null}
          maxDate={new Date(new Date().getTime() + (change ? 30 : userIsFix ? 42 : 14) * 24 * 60 * 60 * 1000)}
          enabledDates={availableDates}
        />}
        
        <Button
          onClick={handleSubmit}
          disabled={!dates.length}
          fullSize={true}
          variant="blue-gradient"
          size="l"
          label={!loading ? 'Далее' : 'Загрузка'}
          icon="arrow"
        />
      </div>
    </div>
  );
};

export default BookingCalendar;
