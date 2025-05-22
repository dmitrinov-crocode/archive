'use client';

import styles from './TrainingCalendar.module.scss';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

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

const TrainingCalendar = ({ onHandleChange, selectedDate, availableDates }) => {
  const handleChangeSelected = (e) => {
    const value = e.value;
    onHandleChange(value);
  };

  return (
    <div className={styles['training-calendar']}>
      <div>
        <Calendar
          className={`${styles['training-calendar__calendar']} training-calendar__calendar`}
          value={new Date(selectedDate?.date)}
          onChange={handleChangeSelected}
          inline
          locale="ru"
          enabledDates={availableDates.map(({ date }) => new Date(date))}
        />
      </div>
    </div>
  );
};

export default TrainingCalendar;
