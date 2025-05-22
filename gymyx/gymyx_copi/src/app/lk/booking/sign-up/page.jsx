'use client';

import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import BookingSignUpHeading from '@/Sections/Account/Booking/BookingSignUpHeading';
import BookingCalendar from '@/Sections/Account/Booking/BookingCalendar';
import BookingSteps from '@/Sections/Account/Booking/BookingSteps';
import { useSelector } from 'react-redux';
import BookingSignUpContent from '@/Sections/Account/Booking/BookingSignUpContent';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getUserData } from '@/Utils/updateDataUser';

const BookingSignUp = () => {
  const { data: sessionData, update } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const { gym, variant } = useSelector((state) => state.booking);

  useEffect(() => {
    if(sessionData?.user?.accessToken)
    getUserData(sessionData?.user?.accessToken)
    .then(res => {
      if(res?.data) {
        setBalance(res?.data?.balance)
      }
    })
  }, [sessionData])

  return (
    <>
      {showModal && (
        <Modal handleClose={() => setShowModal((prev) => !prev)} text={'Извините, пока у нас только один зал :('}>
          <Button
            onClick={() => setShowModal((prev) => !prev)}
            fullSize={true}
            size="l"
            label="Понятно"
            variant="blue"
          />
        </Modal>
      )}

      <BookingSignUpHeading
        handleChangeGym={() => setShowModal((prev) => !prev)}
        gymTitle={gym?.name}
        headingTitle={'Запишитесь на тренировки'}
      />
      <BookingSignUpContent gymTitle={gym?.name} handleChangeGym={() => setShowModal((prev) => !prev)}>
        <BookingCalendar change={false} userIsFix={!!sessionData?.user?.is_fix}/>
        <BookingSteps stepNumber={1} stepTitle={'Выберите день'} balance={balance} packageIsActive={balance > 0}/>
      </BookingSignUpContent>
    </>
  );
};

export default BookingSignUp;
