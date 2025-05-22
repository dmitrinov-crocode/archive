'use client';

import { Link as ScrollLink } from 'react-scroll';
import { useState, useEffect } from 'react';

import styles from './Header.module.scss';
import Link from 'next/link';
import Button from '@/Components/Button';
import MobileMenu from '@/Components/Header/MobileMenu';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { getFioShort } from '@/Utils/helpers';

const Header = ({ isLanding = false, data }) => {
  const sesstion = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [disableLink, setDisableLink] = useState(true);

  const fields = data?.fields;
  const logo = fields.find((field) => field.name === 'logo')?.value;
  const menu = fields.find((field) => field.name === 'Menu')?.childrens;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (sesstion?.status === 'authenticated' && sesstion?.data?.user?.full_name) {
      setUserData({
        isLogined: true,
        fio: getFioShort(sesstion?.data?.user?.full_name),
        image: sesstion?.data?.user?.image,
      });

      if (sesstion && sesstion?.data?.user?.email !== null) {
        setDisableLink(false);
      } else {
        setDisableLink(true);
      }
    }
  }, [sesstion]);

  if (!fields) return null;

  return fields ? (
    <header className={`${styles.header} ${isLanding ? styles['is-landing'] : ''}`}>
      <div className={styles.header__wrapper}>
        <Link href="/?redirect=false" className={styles.header__logo} aria-label="Вернуться на главную">
          <Image alt="logo" width={200} height={50} src={logo || ''} aria-label="Логотип" />
        </Link>
        <div className={styles.header__nav}>
          {menu.slice(0, 5).map((item) => {
            const title = item.find((field) => field.name === 'title')?.value || '';

            const handle = item.find((field) => field.name === 'handle_to')?.value || '';

            const link = item.find((field) => field.name === 'link_to')?.value || '';
            if (handle !== '#') {
              return (
                <ScrollLink
                  key={handle}
                  to={handle}
                  href={link}
                  smooth={true}
                  offset={-65}
                  duration={500}
                  className={styles['header__nav-item']}
                >
                  {title}
                </ScrollLink>
              );
            }
            return (
              <Link
                key={link}
                href={disableLink ? '#' : link}
                passHref
                className={`${styles['header__nav-item']} ${pathname.includes(link) ? styles['active'] : ''}`}
              >
                {title}
              </Link>
            );
          })}
        </div>
        <div className={styles.header__controls}>
          {isLanding && (
            <Link href={'/lk/login'}>
              <Button label={'Записаться'} />
            </Link>
          )}
          {!isLanding && (
            <>
              {!userData?.isLogined && (
                <>
                  <Link href="#" className={styles['header__controls-account-text']}>
                    Войти
                  </Link>
                </>
              )}
              {userData?.isLogined && (
                <Link href={'/lk/profile'}>
                  <p className={styles['header__controls-account-text']}>{userData?.fio}</p>
                </Link>
              )}
            </>
          )}
          {isLanding && (
            <Link href={userData ? '/lk/profile' : '/lk/login'} className={styles['header__controls-account']}>
              <img src="/icons/account.svg" alt="account icon" />
            </Link>
          )}
          {!isLanding && (
            <Link href={userData ? '/lk/profile' : '#'} className={styles['header__controls-account']}>
              <img src={userData?.image || '/icons/account.svg'} alt="account icon" />
            </Link>
          )}
        </div>
        <div
          onClick={handleMobileMenuToggle}
          className={`${styles['header__burger-btn']} ${isMobileMenuOpen ? styles['active'] : ''}`}
        >
          <span></span>
        </div>
      </div>
      <MobileMenu toggleVisibility={handleMobileMenuToggle} items={menu} isShow={isMobileMenuOpen} />
    </header>
  ) : null;
};

export default Header;
