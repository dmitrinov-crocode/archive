'use client';

import ProfileBlockTitle from '@/Components/Account/Profile/ProfileBlockTitle';
import ProfileStatsItem from '@/Components/Account/Profile/ProfileStatsItem';
import Container from '@/Components/Container';

import { useState, useEffect } from 'react';
import styles from './ProfileStats.module.scss';
import { sliderSettings } from './helpers';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSession } from 'next-auth/react';

export const getTrainingData = async (token) => {
  const result = await fetch('/api/booking/get-bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
    next: {
      revalidate: 60,
    },
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
};

const ProfileStats = () => {
  const { data: sessionData } = useSession();
  const [monthsStats, setMonthsStats] = useState([]);
  const [maxCounter, setMaxCounter] = useState({});

  useEffect(() => {
    if (!sessionData) return;

    getTrainingData(sessionData?.user?.accessToken).then(({ data = [] }) => {
      const currentMonth = new Date().getMonth() + 1;

      const tempMonths = [
        { id: 1, label: 'янв', count: 0 },
        { id: 2, label: 'февр', count: 0 },
        { id: 3, label: 'март', count: 0 },
        { id: 4, label: 'апр', count: 0 },
        { id: 5, label: 'май', count: 0 },
        { id: 6, label: 'июн', count: 0 },
        { id: 7, label: 'июл', count: 0 },
        { id: 8, label: 'авг', count: 0 },
        { id: 9, label: 'сен', count: 0 },
        { id: 10, label: 'окт', count: 0 },
        { id: 11, label: 'нояб', count: 0 },
        { id: 12, label: 'дек', count: 0 },
      ];

      data?.forEach(({ date }) => {
        const monthNumber = new Date(date).getMonth() + 1;
        const month = tempMonths.filter(({ id }) => id === monthNumber);
        if (!!month?.length) {
          month[0].count += 1;
        }
      });

      const sortedMonths = [
        ...tempMonths.slice(0, currentMonth).reverse(),
        ...tempMonths.slice(currentMonth).reverse(),
      ];

      setMonthsStats(sortedMonths);
    });
  }, [sessionData]);

  useEffect(() => {
    const sortedMonthsStats = [...monthsStats].sort((a, b) => b.count - a.count);
    const idWithMaxCount = sortedMonthsStats[0];
    setMaxCounter(idWithMaxCount);
  }, [monthsStats]);

  return (
    <section className={styles['profile-stats']}>
      <Container size="M">
        <div className={styles['profile-stats__wrapper']}>
          <ProfileBlockTitle label={'Статистика тренировок'} />
          <div className={styles['profile-stats__list']}>
            <Swiper className={`swiper-container ${styles['profile-stats__list-wrapper']}`} {...sliderSettings}>
              {monthsStats.map(({ id, label, count }) => (
                <SwiperSlide key={id}>
                  <ProfileStatsItem isCurrent={id === maxCounter?.id} label={label} count={count} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProfileStats;
