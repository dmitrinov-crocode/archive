'use client';

import ProfileBlockTitle from '@/Components/Account/Profile/ProfileBlockTitle';
import Checkbox from '@/Components/Checkbox';
import { useEffect, useState } from 'react';

import styles from './ProfileMailing.module.scss';
import { changeSubscribe, deleteSubscribe } from './helpers';
import { signOut, useSession } from 'next-auth/react';

async function getUserData(token) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      signOut({ callbackUrl: '/lk/login' });
      throw new Error(' response was not ok');
    }

    const result = await response.json();
    return result?.data || null;
  } catch (error) {
    signOut({ callbackUrl: '/lk/login' });
    console.error('Error in getUserData:', error);
    throw error;
  }
}

export const ProfileMailing = () => {
  const ITEMS = [
    { id: 1, label: 'Whatsapp', value: 'email' },
    { id: 2, label: 'Telegram', value: 'phone' },
    { id: 3, label: 'Не получать', value: 'none' },
  ];

  const { data: sessionData } = useSession();
  const [activeVariant, setActiveVariant] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (!sessionData?.user?.accessToken) return;

    setLoadingSubmit(true);

    getUserData(sessionData.user.accessToken).then((data) => {
      setLoadingSubmit(false);
      data.subscriptions.length > 0 ? setActiveVariant(data.subscriptions) : setActiveVariant(['none']);
    });
  }, [sessionData?.user?.accessToken]);

  const updateData = () => {
    if (sessionData) {
      getUserData(sessionData?.user?.accessToken).then((data) => {
        setLoadingSubmit(false);
        data.subscriptions.length > 0 ? setActiveVariant(data.subscriptions) : setActiveVariant(['none']);
      });
    }
  };

  const removeFromArray = (arr, itemToRemove) => {
    return arr.filter((item) => item !== itemToRemove);
  };

  const deleteAndHandle = async (accessToken, target, variant) => {
    try {
      const data = await deleteSubscribe(accessToken, target);
      if (data.data.success) {
        setActiveVariant((prevActiveVariant) => removeFromArray(prevActiveVariant, variant));
        updateData();
      }
    } catch (error) {
      return console.error(`Error in ${variant} deletion API call:`, error);
    }
  };

  const toggleVariant = (value) => {
    if (loadingSubmit) return;

    setLoadingSubmit(true);
    setActiveVariant((prevActiveVariant) => [...prevActiveVariant, value]);

    if (value !== 'none') {
      if (activeVariant.includes('none')) {
        setActiveVariant((prevActiveVariant) => removeFromArray(prevActiveVariant, 'none'));
      }

      if (activeVariant.includes(value.toString())) {
        deleteSubscribe(sessionData?.user?.accessToken, value)
          .then((data) => {
            if (data.data.success) {
              setActiveVariant((prevActiveVariant) => removeFromArray(prevActiveVariant, value));
              updateData();
            }
          })
          .catch((error) => console.error('Error in deletion API call:', error))
          .finally(() => setLoadingSubmit(false));
      } else {
        changeSubscribe(sessionData?.user?.accessToken, value)
          .then((data) => {
            if (data.data.success) {
              setActiveVariant((prevActiveVariant) => [...prevActiveVariant, value]);
              updateData();
            }
          })
          .catch((error) => console.error('Error in subscription API call:', error))
          .finally(() => setLoadingSubmit(false));
      }
    } else {
      Promise.all([
        deleteAndHandle(sessionData?.user?.accessToken, 'email', 'email'),
        deleteAndHandle(sessionData?.user?.accessToken, 'phone', 'phone'),
      ]).finally(() => setLoadingSubmit(false));
    }
  };

  return (
    <section className={styles['profile-mailing']}>
      <div className={styles['profile-mailing__wrapper']}>
        <ProfileBlockTitle label={'Рассылка'} />
        <div className={styles['profile-mailing__list']}>
          {ITEMS.map(({ id, label, value }) => (
            <Checkbox
              key={id}
              value={value}
              isActive={activeVariant.includes(value)}
              toggleActive={() => toggleVariant(value)}
              loading={loadingSubmit}
              label={label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileMailing;
