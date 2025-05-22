import styles from './CheckoutList.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { updateBookingData } from '@/redux/bookingSlice';
import { sortVisitDates, canDelete } from './helpers';
import BookingCard from '@/Components/Booking/BookingCard';

const CheckoutList = ({ items }) => {
  const dispatch = useDispatch();
  const { gym, visitDate } = useSelector((state) => state.booking);

  const handleDeleteItem = (data) => {
    if (canDelete(items)) {
      const { valueDate, valueTime } = data;
      const newVisitDates = sortVisitDates(visitDate, valueDate, valueTime);
      dispatch(updateBookingData({ visitDate: newVisitDates, currentDate: 0 }));
    }
  };

  return (
    <div className={styles['checkout-list']}>
      <div className={styles['checkout-list__wrapper']}>
        {items.map(({ time, value }, index) => {
          return time.map((timeZome) => {
            return (
              <BookingCard
                id={{ valueDate: value, valueTime: timeZome }}
                isSingle={!canDelete(items)}
                key={`checkout_card_${index}`}
                onClickDelete={handleDeleteItem}
                date={value}
                time={timeZome}
                gymTitle={gym?.name}
                address={gym?.address}
                transferIsShow={false}
              />
            );
          });
        })}
      </div>
    </div>
  );
};

export default CheckoutList;
