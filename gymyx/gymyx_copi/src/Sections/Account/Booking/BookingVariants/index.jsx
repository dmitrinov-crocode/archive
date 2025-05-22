import styles from './BookingVariants.module.scss';

import BookingVariantsItem from '@/Components/Booking/BookingVariantsItem';
import Container from '@/Components/Container';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateBookingData } from '@/redux/bookingSlice';

const BookingVariants = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const discountData = {
    text: 'выгода',
    sale: `до 30%`,
  }

  const handleChooseVariant = (url, variant) => {
    dispatch(updateBookingData({ variant: variant }));
    router.push(url);
  };

  return (
    <section className={styles['booking-variants']}>
      <Container>
        <div className={`${styles['booking-variants__wrapper']}`}>
          <BookingVariantsItem
            onClick={() => handleChooseVariant('/lk/booking/sign-up', 'multiple')}
            image={'/icons/gym.svg'}
            tagLabel={'разовое посещение'}
            title={'Записаться на тренировку'}
            variant="white"
          />
          <BookingVariantsItem
            onClick={() => handleChooseVariant('/lk/booking/purchasing-package', 'multiple')}
            tagLabel={'тренировки на балансе'}
            title={'Выбрать пакет тренировок'}
            variant="black"
            discount={discountData}
          />
        </div>
      </Container>
    </section>
  );
};

export default BookingVariants;
