'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './MobileBar.module.scss';
import { useEffect, useState } from 'react';

const MENU = [
  {
    title: 'Тренировки',
    link: '/lk/workouts',
    icon: '/icons/mobile-bar/trainings.svg',
  },
  {
    title: 'Бронь',
    link: '/lk/booking',
    sublink: '/lk/checkout',
    icon: '/icons/mobile-bar/booking.svg',
  },
  {
    title: 'Профиль',
    link: '/lk/profile',
    icon: '/icons/mobile-bar/profile.svg',
  },
  { title: 'Гид', link: '/lk/guide', icon: '/icons/mobile-bar/gid.svg' },
  {
    title: 'Тренеры',
    link: '/lk/trainers',
    icon: '/icons/mobile-bar/trainers.svg',
  },
];

const MobileBar = ({ headerData }) => {
  const { data } = useSession();
  const pathname = usePathname();
  const [menuSorted, setMenuSorted] = useState([]);
  const [menuNew, setMenuNew] = useState([]);

  useEffect(() => {
    setMenuNew([...headerData.fields[1].childrens]);
  }, [data]);

  useEffect(() => {
    if (menuNew) {
      const newMenu = [];
      MENU.forEach((menuItem) => {
        const exists = menuNew.some((submenuItems) =>
          submenuItems.some((item) => item.name === 'link_to' && item.value === menuItem.link),
        );
        if (exists) {
          newMenu.push(menuItem);
        }
      });

      const profileMenuItem = MENU.find((item) => item.title === 'Профиль');
      if (profileMenuItem) {
        newMenu.splice(2, 0, profileMenuItem);
      }

      setMenuSorted(newMenu);
    }
  }, [menuNew, MENU]);

  if (!data?.user?.full_name) return;

  return (
    <div className={styles['mobile-bar']}>
      <div className={styles['mobile-bar__wrapper']}>
        {menuSorted.map(({ title, link, sublink, icon }) => (
          <Link
            key={title}
            href={link}
            className={`${styles['mobile-bar__btn']} ${
              pathname.includes(link) || pathname.includes(sublink) ? styles['active'] : ''
            }`}
          >
            <div className={styles['mobile-bar__btn-icon']}>
              <img src={icon} alt="mobile bar image" />
            </div>
            <p className={styles['mobile-bar__btn-title']}>{title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileBar;
