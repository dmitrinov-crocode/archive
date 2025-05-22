'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTrainingData, resetTrainingData } from '@/redux/transferTrainingData';

// import { useSelector } from 'react-redux';

import PageHeading from '@/Sections/Account/PageHeading';
import NavigationTabs from '@/Sections/Account/NavigationTabs';
import TrainingContent from '@/Sections/Account/Training/TrainingContent';
import TrainingCalendar from '@/Sections/Account/Training/TrainingCalendar';
import TrainingItems from '@/Sections/Account/Training/TrainingItems';
import Loading from '@/Components/Loading';
import { formatDate } from '@/Utils/helpers';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import { getUserData } from '@/Utils/updateDataUser';
import { updateBookingVisitDate } from '@/redux/bookingSlice';

import { cancelBooking, canDelete } from '@/Sections/Account/ProfileTrainings/helpers';

export const getTrainingData = async (token) => {
  const result = await fetch('/api/booking/get-bookings', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
};

const TABS = [
  { id: 0, title: 'Предстоящие' },
  { id: 1, title: 'Архив' },
];

const concateDateTime = (date, time) => {
  const fullDateTimeStr = `${date}T${time}`;
  return new Date(fullDateTimeStr);
};

const Training = () => {
  const { data: sessionData, update } = useSession();
  const [allTrainingsDates, setAllTrainingsDates] = useState([]);
  const [sortedTrainingsDates, setSortedTrainingsDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [latestDataTrainings, setLatestDataTrainings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true)
  const [deleteIsError, setDeleteIsError] = useState(false)
  const [modalData, setModalData] = useState({
    type: '', //transfer, delete, toggle, confirmation
    isShow: false,
    text: '',
  })
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    updateDate();
  }, [sessionData]);

  useEffect(() => {
    const dataTemp = getDataForPeriod(selectedTab, allTrainingsDates);

    setSortedTrainingsDates(
      dataTemp.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA - dateB;
        } else {
          const timeA = new Date(`1970-01-01T${a.time}`);
          const timeB = new Date(`1970-01-01T${b.time}`);
          return timeA - timeB;
        }
      }) || [],
    );
  }, [selectedTab, allTrainingsDates]);

  const changeTraining = (oldId, oldDate, oldTime) => {
    dispatch(resetTrainingData())
    if (!sessionData?.user?.accessToken) return;

    dispatch(updateBookingVisitDate({ visitDate: {value: "", time: []}}));
    dispatch(setTrainingData({oldId, oldDate, oldTime}))
    router.push(`/lk/booking/change-trainitg`)
  }

  const updateDate = () => {
    if (!sessionData?.user?.accessToken) return;
    setLoadingItems(true)
    let result;

    if (selectedDate) {
      result = sortedTrainingsDates.filter(({ date }) => date === selectedDate.date);
    }

    setLatestDataTrainings(result);
    getTrainingData(sessionData?.user?.accessToken).then(({ data = [] }) => {
      setAllTrainingsDates(data);
      setLoading(false);
      setLoadingItems(false)
    });
  };

  const handleChangeSelectedDate = (value) => {
    const selectedDateTemp = allTrainingsDates.filter(({ date }) => formatDate(date) === formatDate(value));

    if (!selectedDateTemp?.length) return;

    if (selectedDateTemp[0].date === (selectedDate && selectedDate.date)) {
      setSelectedDate(null);
    } else {
      setSelectedDate(selectedDateTemp[0]);
    }
  };

  const getDataForPeriod = (tab_id, data) => {
    let returnedData = [];
    if (tab_id === 0) {
      //ПРЕДСТОЯЩИЕ

      returnedData = data.filter(({ date, time }) => concateDateTime(date, time) >= new Date());
    } else {
      //АРХИВ

      returnedData = data.filter(({ date, time }) => concateDateTime(date, time) < new Date());
    }

    return returnedData;
  };

  const handleChangeSelectedTab = (index) => {
    setSelectedTab(index);
    setSelectedDate(null);
  };

  const handleShow = (id = -1) => {
    setDeleteIsError(false)
    setCurrentItemId(id);
  };

  const handleClickDelete = () => {
    if (currentItemId > 0) {
      setLoadingDelete(true);
      deleteBookingItem(currentItemId);
    }
  };

  const deleteBookingItem = (id) => {
    if (canDelete(sortedTrainingsDates)) {
      cancelBooking(sessionData.user.accessToken, id)
      .then((data) => {
        if (data?.data?.status) {
          updateDate();
          getUserData(sessionData?.user?.accessToken)
          .then(data => {
            if(data?.data) update(data?.data)
          })
        } else {
          setDeleteIsError(true)
        }
        setLoadingDelete(false);
        modalType();
      });
    }
  };

  const modalType = (type) => {
    if(type == 'confirmation') {
      setModalData(prev => ({
        ...prev,
        type: 'delete',
        isShow: true,
        text: `До тренировки осталось меньше 4 часов, средства не будут возвращены. 
        Отменить?`
      }))
    }
    else if(type == 'delete') {
      setModalData(prev => ({
        ...prev,
        type: 'delete',
        isShow: true,
        text: 'Вы точно хотите отменить тренировку?'
      }))
    } else if(type == 'transfer') {
      setModalData(prev => ({
        ...prev,
        type: 'transfer',
        isShow: true,
        text: 'извините, перенос возможен не позднее 4 часов до занятия :('
      }))
    } else if(type == 'toggle') {
      setModalData(prev => ({
        ...prev,
        isShow: !modalData.isShow
      }))
    } else {
      setModalData(prev => ({
        ...prev,
        isShow: false
      }))
    }
  }

  if (loading) return <Loading full_screen={true} />;

  return (
    <>
      {modalData.isShow && (
        <Modal handleClose={modalType} text={modalData.text}>
          {modalData.type == 'transfer' && (
            <Button
              onClick={modalType}
              fullSize={true}
              size="l"
              label={'Закрыть'}
              variant="blue-gradient"
              disabledShadow={true}
            />
          )}
          {(modalData.type == 'delete' || modalData.type == 'confirmation') && (
            <div style={{width: '100%'}}>
              <div style={{display: 'flex', gap: '24px'}}>
                <Button
                  onClick={handleClickDelete}
                  fullSize={true}
                  size="l"
                  label={'Да'}
                  disabled={loadingDelete}
                  variant="black-gradient"
                  disabledShadow={true}
                />
                <Button 
                  onClick={modalType} 
                  fullSize={true} 
                  size="l" 
                  label="Нет" 
                  variant="blue-gradient" 
                  disabledShadow={true} 
                />
              </div>
              {deleteIsError && <p className="" style={{color: 'red', fontSize: '18px', paddingTop: '15px', textAlign: 'center'}}>Произошла ошибка попробуйте позже</p>}
            </div>
          )}
        </Modal>
      )}
      <div className="account-page-wrapper">
        <PageHeading title={'Тренировки'} />
        <NavigationTabs items={TABS} selectedTab={selectedTab} handleChangeTab={handleChangeSelectedTab} />
        <TrainingContent>
          <TrainingCalendar
            selectedDate={selectedDate}
            onHandleChange={handleChangeSelectedDate}
            availableDates={sortedTrainingsDates}
          />
          {loadingItems ? (
            <Loading full_screen={false}/>
          ) : (
            <TrainingItems
              onDelete={deleteBookingItem}
              token={sessionData?.user?.accessToken}
              handleUpdateDate={updateDate}
              handleDeleteItem={handleShow}
              handlerChangeTraining={changeTraining}
              selectedDate={selectedDate}
              archive={selectedTab === 1}
              items={sortedTrainingsDates}
              modalType={modalType}
            />
          )}
        </TrainingContent>
      </div>
    </>
  );
};

export default Training;
