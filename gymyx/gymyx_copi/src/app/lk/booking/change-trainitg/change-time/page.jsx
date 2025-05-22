'use client';

import BookingSignUpHeading from '@/Sections/Account/Booking/BookingSignUpHeading';
import BookingSignUpTags from '@/Sections/Account/Booking/BookingSignUpTags';
import BookingSignUpContent from '@/Sections/Account/Booking/BookingSignUpContent';
import BookingSteps from '@/Sections/Account/Booking/BookingSteps';
import NavigationBack from '@/Sections/Account/NavigationBack';
import BookingTimePricing from '@/Sections/Account/Booking/BookingTimePricing';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import { useRouter } from 'next/navigation';
import Loading from '@/Components/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const variants = [
  { value: '00:00', bgColor: '#7B92FF' },
  { value: '08:00', bgColor: '#294AE7' },
  { value: '13:00', bgColor: '#1E318A' },
  { value: '19:00', bgColor: '#061641' },
];

const checkIsOnlyTraining = (data) => {
  let result = true;
  data.forEach(({ time }) => {
    if (!!time.length) {
      result = false;
      return;
    }
  });

  return result;
};

const ChangeTime = () => {
  const { data: sessionData } = useSession();
  const { gym, visitDate } = useSelector((state) => state.booking);
  const [pricesVariants, setPricesVariants] = useState([]);
  const [isLoad, setIsLoad] = useState(false)
  const [modalData, setModalData] = useState({
    type: '', // error, completed, less
    text: 'Ваша тренировка успешно перенесена!',
    isShow: false
  })
  const router = useRouter()

  const hanglerModalButtonClick = () => {
    if(modalData.type == 'less') {
      setModalData(prev => ({
        ...prev,
        isShow: false
      }))
    } else {
      router.push('/lk/workouts')
    }
  }

  useEffect(() => {
    if (gym?.prices && sessionData) {
      let variantsTemp = [];

      if (sessionData.user.is_new) {
        if (!checkIsOnlyTraining(visitDate)) {
          variantsTemp = gym.prices.map((item, index) => {
            return { ...item, bgColor: variants[index]?.bgColor };
          });
        } else {
          variantsTemp = [
            {
              start: '00:00:00',
              end: '23:00:00',
              price: gym?.min_price,
              bgColor: variants[0]?.bgColor,
            },
          ];
        }
      } else {
        variantsTemp = gym.prices.map((item, index) => {
          return { ...item, bgColor: variants[index]?.bgColor };
        });
      }
      setPricesVariants(variantsTemp);
    }
  }, [gym, sessionData, visitDate]);

  return (
    <>
    {isLoad && <Loading full_screen={true}/>}
    {modalData.isShow && (
        <Modal handleClose={() => {}} text={modalData.text}>
          <Button
            onClick={hanglerModalButtonClick}
            fullSize={modalData.isShow}
            size="l"
            label={modalData.type == 'less' ? 'Подтвердить' : "К тренировкам"}
            variant="blue"
            disabledShadow={true}
          />
        </Modal>
      )}
      <NavigationBack buttonLabel={'Вернуться к выбору дней'} link={'/lk/booking/change-trainitg'} />
      <BookingSignUpHeading showButtonEditGym={false} headingTitle={'Перенесите тренировку'}/>
      <BookingSignUpTags change={true}/>
      <BookingSignUpContent gymIsShow={false}>
        <BookingTimePricing variants={pricesVariants} change={true} setModaldata={setModalData} setIsLoad={setIsLoad}/>
        <BookingSteps stepNumber={2} stepTitle={'Выберите время'} />
      </BookingSignUpContent>
    </>
  );
};

export default ChangeTime;
