'use client';

import BookingHero from '@/Sections/Account/Booking/BookingHero';
import BookingVariants from '@/Sections/Account/Booking/BookingVariants';

import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import { useEffect, useState } from 'react';
import Loading from '@/Components/Loading';
import { useDispatch } from 'react-redux';
import { updateBookingData } from '@/redux/bookingSlice';
import { useSession } from 'next-auth/react';

const getGyms = async (token) => {
  const result = await fetch('/api/booking/get-gyms', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
};

const Booking = () => {
  const dispatch = useDispatch();
  const { data: sessionData, update } = useSession();

  const [showModal, setShowModal] = useState(false);
  const [gyms, setGyms] = useState([{}]);
  const [activeGym, setActiveGym] = useState({});
  const [loading, setLoading] = useState(true);

  const handleChangeGym = () => {
    //ПО УМОЛЧАНИЮ 1 ЗАЛ
    setShowModal((prev) => !prev);
    // if (gyms.length === 1 && !showModal) {
    //   setShowModal(true)
    // } else {
    //   if (showModal) {
    //     setShowModal(false)
    //   }
    // }
  };

  useEffect(() => {

    // setLoading(true);
    if (sessionData) {
      getGyms(sessionData?.user?.accessToken).then(({ data }) => {
        if (data.length > 0) {
          setGyms(data);
          setActiveGym(data[0]);
          dispatch(
            updateBookingData({
              gym: data[0],
              variant: null,
              visitDate: null,
              currentDate: 0,
              avaliableTimesCurrentDay: [],
              loading: false,
            }),
          );
        }
        setLoading(false);
      });
    }
  }, [sessionData]);

  if (loading) {
    return <Loading full_screen={true} />;
  }

  return (
    <>
      {showModal && (
        <Modal handleClose={handleChangeGym} text={'Извините, пока у нас только один зал :('}>
          <Button
            onClick={handleChangeGym}
            fullSize={true}
            size="l"
            label="Понятно"
            variant="blue"
            disabledShadow={true}
          />
        </Modal>
      )}
      <div className="booking-page__wrapper">
        <BookingHero data={activeGym} handleButtonClick={handleChangeGym} />
        <BookingVariants />
      </div>
    </>
  );
};

export default Booking;