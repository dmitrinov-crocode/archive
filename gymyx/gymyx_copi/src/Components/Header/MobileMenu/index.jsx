import { scroller } from 'react-scroll';
import Button from '@/Components/Button';
import styles from './MobileMenu.module.scss';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const MobileMenu = ({ items, isShow, toggleVisibility }) => {
  const { data: sessionData } = useSession();

  const router = useRouter();
  const handleClickMobileMenuItem = (target, link) => {
    if (target !== '#') {
      scroller.scrollTo(target, {
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -70,
      });
    } else {
      router.push(link);
    }

    toggleVisibility();
  };

  return (
    <div className={`${styles['mobile-menu']} ${isShow ? styles['active'] : ''}`}>
      <div className={styles['mobile-menu__wrapper']}>
        <div className={styles['mobile-menu__nav']}>
          {items &&
            items.map((item) => {
              const title = item.find((field) => field.name === 'title')?.value || '';
              const handle = item.find((field) => field.name === 'handle_to')?.value || '';

              const link = item.find((field) => field.name === 'link_to')?.value || '';

              return (
                <div
                  onClick={() => handleClickMobileMenuItem(handle, link)}
                  key={`${handle !== '#' ? handle : link}-mobile`}
                  className={styles['mobile-menu__nav-item']}
                >
                  {title}
                </div>
              );
            })}
        </div>
        <div>
          {!sessionData ? (
            <>
              <Link href={'/lk/login'}>
                <Button variant="blue" size="l" label={'Зарегистрироваться'} />
              </Link>

              <div className={styles['mobile-menu__login']}>
                <span>У вас есть аккаунт?</span>{' '}
                <Link href="/lk/login">
                  <u>Войти</u>
                </Link>
                <span className={styles['mobile-menu__login-icon']}>
                  <img src="/icons/login.svg" alt="login icon" />
                </span>
              </div>
            </>
          ) : (
            <Link href="/lk/profile">
              <Button
                size="l"
                label={'Перейти в профиль'}
                onClick={() => {
                  router.push('/lk/profile');
                }}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
