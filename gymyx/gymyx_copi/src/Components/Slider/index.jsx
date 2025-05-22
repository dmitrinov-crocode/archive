'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import AdvantagesItem from '../Advantages/AdvantagesItem';
import SectionTitle from '../SectionTitle';
import SliderControls from './SliderControls';
import TrainreSlide from './TrainerSlide';
import styles from './Slider.module.scss';
import 'swiper/css';

import { useState, useEffect } from 'react';

import { EffectCards, Mousewheel } from 'swiper/modules';

const sliderMobileSettings = {
  effect: 'cards',
  centeredSlides: true,
  loop: true,
};

const sliderPcSettings = {
  spaceBetween: 25,
  slidesPerView: 2.2,
  mousewheel: {
    thresholdDelta: 70,
    forceToAxis: true,
  },

  breakpoints: {
    992: {
      spaceBetween: 25,
      slidesPerView: 3.2,
    },

    1200: {
      spaceBetween: 35,
      slidesPerView: 3,
    },

    1440: {
      spaceBetween: 30,
      slidesPerView: 3,
    },

    1920: {
      spaceBetween: 40,
      slidesPerView: 3.2,
    },
  },
};

const Slider = ({ title, items, name }) => {
  const [slider, setSlider] = useState();
  const [activeIndexSlide, setIndexActiveSlide] = useState(1);
  const [sliderSettings, setSliderSettings] = useState(null);

  const nextSlide = () => {
    slider.slideNext();
    setIndexActiveSlide(slider.activeIndex + 1);
  };

  const prevSlide = () => {
    slider.slidePrev();
    setIndexActiveSlide(slider.activeIndex + 1);
  };

  const onChangeSlide = (e) => {
    setIndexActiveSlide(e.activeIndex + 1);
  };

  const handleInit = (e) => {
    setSlider(e);
  };

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 992px)').matches;
    setSliderSettings(isMobile ? sliderMobileSettings : sliderPcSettings);
  }, []);

  return (
    <>
      <div className={styles.slider__heading}>
        <SectionTitle title={title} />
        {items.length > 3 && (
          <SliderControls
            handleNextSlide={nextSlide}
            handlePrevSlide={prevSlide}
            activeSlide={activeIndexSlide}
            countSlides={slider?.slides?.length}
            isShowCount={false}
          />
        )}
      </div>
      {sliderSettings && (
        <Swiper
          modules={[EffectCards, Mousewheel]}
          className={`swiper-container ${styles.slider}`}
          onSlideChange={onChangeSlide}
          onSwiper={handleInit}
          {...sliderSettings}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              {name == 'trainers' ? <TrainreSlide props={item} /> : <AdvantagesItem props={item} />}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Slider;
