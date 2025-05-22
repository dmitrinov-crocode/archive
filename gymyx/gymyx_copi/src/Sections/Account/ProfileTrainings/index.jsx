'use client';

import Container from '@/Components/Container';
import styles from './ProfileTrainings.module.scss';
import { useSession } from 'next-auth/react';

import { canDelete, cancelBooking, getTrainingData } from './helpers';

import { useState, useEffect } from 'react';
import Loading from '@/Components/Loading';
import { formatDate, formatTime } from '@/Utils/helpers';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import { useDispatch } from 'react-redux';
import { resetTrainingData, setTrainingData } from '@/redux/transferTrainingData';
import { updateBookingVisitDate } from '@/redux/bookingSlice';
import { useRouter } from 'next/navigation';

const ProfileTrainings = ({isShowTranfer = false}) => {
  const { data: sessionData } = useSession();
  const [closestTraining, setClosestTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState({
    type: '',
    isShow: false,
    text: ''
  });
  const [curIdItem, setCurIdItem] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [transferIsActive, setTransferIsActive] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    updateData();
  }, [sessionData]);

  const updateData = () => {
    if (!sessionData) return;

    getTrainingData(sessionData?.user?.accessToken).then(({ data }) => {
      function parseDateTime(date, time) {
        return new Date(`${date}T${time}`);
      }

      if (data) {
        const sortedData = data
          .filter((item) => {
            const currentDate = new Date();
            const itemDate = parseDateTime(item.date, item.time);
            return itemDate > currentDate;
          })
          .sort((a, b) => {
            const dateA = parseDateTime(a.date, a.time);
            const dateB = parseDateTime(b.date, b.time);
            return dateA - dateB;
          })

        const closestTraining = sortedData[0];
        if(closestTraining) {
          setTransferIsActive(!isDifferenceMoreThan4Hours(closestTraining.date, closestTraining.time))
        }

        setClosestTraining(closestTraining);
      }
      setLoading(false);
    });
    setLoading(false);
  };

  const handleDeleteItem = (id) => {
    cancelBooking(sessionData?.user?.accessToken, id).then((data) => {
      if (data.data.status) {
        updateData();
        setLoadingDelete(false);
        handleShow();
      }
    });
  };

  const handleClickItem = (id) => {
    const less4Hours = isDifferenceMoreThan4Hours(closestTraining.date, closestTraining.time)
    if(less4Hours) {
      modalTypes('warning')
    } else {
      modalTypes('delete')
    }
    setCurIdItem(id);
  };

  const handleShow = () => {
    setShowModal((prev) => !prev);
  };

  const handleClickDelete = () => {
    setLoadingDelete(true);
    handleDeleteItem(curIdItem);
  };

  const handlerClickChange = (oldId, oldDate, oldTime) => {
    const less4Hours = isDifferenceMoreThan4Hours(closestTraining.date, closestTraining.time)
    if(less4Hours) {
      modalTypes('notification')
    } else {
      changeTraining(oldId, oldDate, oldTime)
    }
    
  }

  const changeTraining = (oldId, oldDate, oldTime) => {
    dispatch(resetTrainingData())
    if (!sessionData?.user?.accessToken) return;

    dispatch(updateBookingVisitDate({ visitDate: {value: "", time: []}}));
    dispatch(setTrainingData({oldId, oldDate, oldTime}))
    router.push(`/lk/booking/change-trainitg`)
  }

  const modalTypes = (type) => {
    if(type === 'delete') {
      setShowModal(prev => ({
        ...prev,
        type: 'delete',
        isShow: true,
        text: 'Вы точно хотите отменить тренировку?'
      }))
    } else if(type === 'warning') {
      setShowModal(prev => ({
        ...prev,
        type: 'delete',
        isShow: true,
        text: `До тренировки осталось меньше 4 часов, средства не будут возвращены. 
        Отменить?`
      }))
    } else if(type === 'notification') {
      setShowModal(prev => ({
        ...prev,
        type: 'notification',
        isShow: true,
        text: `Извините, перенос возможен не позднее 4 часов до занятия :(`
      }))
    } else {
      setShowModal(prev => ({
        ...prev,
        type: '',
        isShow: false,
        text: ``
      }))
    }
  }

  const isDifferenceMoreThan4Hours = (dateStr, timeStr) => { 
    const dateTime = new Date(`${dateStr}T${timeStr}`);
    const nowTime = new Date();
  
    const differenceInMs = dateTime - nowTime;
    const differenceInHours = differenceInMs / (1000 * 60 * 60);
    return (differenceInHours < 4)
  }

  if (loading) return <Loading full_screen={true} background={true} />;
  if (!closestTraining) return;

  return (
    <>
      {showModal.isShow && (
        <Modal handleClose={handleShow} text={showModal.text}>
          {showModal.type === 'delete' && (
            <>
              <Button
              fullSize={true}
              size="l"
              label={!loadingDelete ? 'Да' : 'Загрузка'}
              variant="black-gradient"
              onClick={handleClickDelete}
              disabledShadow={true}
            />
            <Button 
              fullSize={true} 
              size="l" 
              label="Нет" 
              variant="blue-gradient" 
              onClick={handleShow} 
              disabledShadow={true} 
            />
            </>
          )}
          {showModal.type === 'notification' && (
            <Button fullSize={true} size="l" label="Закрыть" variant="blue-gradient" onClick={modalTypes} disabledShadow={true} />
          )}
        </Modal>
      )}

      <section className={styles['profile-trainings']}>
        <Container size="M">
          <div className={styles['profile-trainings__wrapper']}>
            <div className={styles['profile-trainings__content']}>
              <div className={styles['profile-trainings__object']}>
                <img src="/icons/icon.svg" alt="icon"/>
              </div>
              <div className={styles['profile-trainings__content']}>
                <div className={styles['profile-trainings__date']}>
                  <p className={styles['profile-trainings__date-value']}>{formatDate(closestTraining.date)}</p>
                  <div className={styles['profile-trainings__date-time']}>{formatTime(closestTraining.time)}</div>
                </div>
                <div className={styles['profile-trainings__col']}>
                  <p className={styles['profile-trainings__title']}>{closestTraining?.gym?.name || ''}</p>
                  <p className={styles['profile-trainings__text']}>{closestTraining?.gym?.address || ''}</p>
                </div>
              </div>
            </div>
            <div className={styles['profile-trainings__asside']}>
              <div className={styles['profile-trainings__btn']} onClick={() => handleClickItem(closestTraining?.id)}>
                <img src="/icons/cross.svg" alt="cross" />
              </div>
              {isShowTranfer && 
              (
                <button className={`${styles["profile-trainings__btn-transfer"]} 
                  ${!transferIsActive ? styles["profile-trainings__btn-transfer--disabled"] : ''}`} type='button'
                  onClick={() => handlerClickChange(closestTraining?.id, closestTraining.date, closestTraining?.time)}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 42" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M26.1544 13.8711L32.7932 12.521C29.1039 8.1411 23.1224 5.97812 17.187 7.44409C11.5897 8.82654 7.45871 13.0842 5.97807 18.256L1.79057 17.3083C3.62283 10.6052 8.93363 5.06642 16.159 3.28186C23.701 1.41908 31.3013 4.14769 36.0142 9.6889L34.7777 1.5299L38.4868 0.967804L40.5779 14.7661L26.9019 17.5473L26.1544 13.8711ZM15.2122 27.1571L8.73444 29.1662C12.4077 33.6877 18.4854 35.9441 24.5157 34.4547C30.1129 33.0722 34.2439 28.8146 35.7246 23.6427L39.9121 24.5905C38.0798 31.2936 32.769 36.8324 25.5437 38.6169C18.0826 40.4597 10.5644 37.8091 5.84114 32.3873L7.86568 40.2985L4.2314 41.2285L0.771484 27.7083L14.1009 23.5741L15.2122 27.1571Z" fill="currentColor"/>
                  </svg>
                </button>
              )}
              
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProfileTrainings;
