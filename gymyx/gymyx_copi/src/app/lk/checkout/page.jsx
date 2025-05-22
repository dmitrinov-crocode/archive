'use client';

import NavigationBack from '@/Sections/Account/NavigationBack';
import BookingSignUpHeading from '@/Sections/Account/Booking/BookingSignUpHeading';
import CheckoutContent from '@/Sections/Account/Checkout/CheckoutContent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const { visitDate } = useSelector((state) => state.booking);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visitDate.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    setTimeout(() => {
      if (visitDate.length === 0) {
        router.push('/lk/booking/sign-up');
      }
    }, 1000);
  }, [visitDate]);

  if (loading) return;

  return (
    <>
      <NavigationBack buttonLabel={'Вернуться к выбору'} link={'/lk/booking/sign-up/choose-time'} />
      <BookingSignUpHeading showButtonEditGym={false} headingTitle={'Оплата'} />
      <CheckoutContent />
    </>
  );
};

export default Checkout;
