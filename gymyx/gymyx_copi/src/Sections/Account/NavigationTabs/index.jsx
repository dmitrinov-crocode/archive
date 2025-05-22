'use client';

import Container from '@/Components/Container';
import NavigationTab from './NavigationTab';
import styles from './NavigationTabs.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const sliderSettings = {
  slidesPerView: 'auto',
  spaceBetween: 15,

  breakpoints: {
    992: {
      spaceBetween: 30,
    },
  },
};

const NavigationTabs = ({ items, selectedTab, handleChangeTab }) => {
  return (
    <section className={styles['navigation-tabs']}>
      <Container>
        <div className={`${styles['navigation-tabs__list']}`}>
          <Swiper className={`${styles['swiper-tabs']} swiper-container`} {...sliderSettings}>
            {items.map(({ title }, index) => (
              <SwiperSlide key={index}>
                <NavigationTab selectedTab={selectedTab} handleClick={handleChangeTab} title={title} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles['navigation-tabs__btns']}></div>
      </Container>
    </section>
  );
};

export default NavigationTabs;
