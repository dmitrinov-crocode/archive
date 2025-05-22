'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

import ProfileInfo from '@/Components/Account/Profile/ProfileInfo';
import ProfileLogout from '@/Components/Account/Profile/ProfileLogout';
import Button from '@/Components/Button';
import Container from '@/Components/Container';

import styles from './PrfileHeading.module.scss';

const ProfileHeading = () => {
  return (
    <section className={styles['profile-heading']}>
      <Container size="M">
        <div className={styles['profile-heading__wrapper']}>
          <ProfileInfo />
          <div className={styles['profile-heading__controls']}>
            <Link href={'/lk/profile/edit'}>
              <Button variant="blue-gradient" size="m" label={'Редактировать'} />
            </Link>
            <ProfileLogout handleClick={() => signOut({ callbackUrl: '/lk/login' })} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProfileHeading;
