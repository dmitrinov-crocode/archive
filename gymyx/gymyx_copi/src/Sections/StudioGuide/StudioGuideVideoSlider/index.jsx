'use client';

import styles from './StudioGuideSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState, useEffect } from 'react';
import { Mousewheel } from 'swiper/modules';

import SliderControls from '@/Components/Slider/SliderControls';
import StudioGuideSlide from './StudioGuideSlide';
import Container from '@/Components/Container';

const StudioGuideVideoSlider = ({videoData}) => {
  const [slider, setSlider] = useState();
  const [activeIndexSlide, setIndexActiveSlide] = useState(1);
  const [sliderSettings, setSliderSettings] = useState(null);
  const items = videoData?.find(el => el.type === 'object')?.childrens || []

  const sliderPcSettings = {
    spaceBetween: 25,
    slidesPerView: 2.2,
    mousewheel: {
      thresholdDelta: 70,
      forceToAxis: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 3,
      },
      992: {
        spaceBetween: 25,
        slidesPerView: 2.2,
      },

      1200: {
        spaceBetween: 35,
        slidesPerView: 2.2,
      },

      1400: {
        spaceBetween: 40,
        slidesPerView: 2.656,
      },
    },
  };

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
    isMobile ? handleInit : setSliderSettings(sliderPcSettings);
  }, []);

  return (
    <Container>
    {items.length ? (
      <div className={styles['trainers-slider']}>
        <div className={styles['trainers-slider__title-wrapper']}>
          {sliderSettings ? (
            <SliderControls
              handleNextSlide={nextSlide}
              handlePrevSlide={prevSlide}
              activeSlide={activeIndexSlide}
              countSlides={slider?.slides?.length}
              isTrainers={true}
              isShowCount={false}
            />
          ) : null}
        </div>

        {sliderSettings ? (
          <div className={styles['trainers-slider__swiper-wrapper']}>
            <Swiper
              style={{padding: '0 40px'}}
              onSlideChange={onChangeSlide}
              onSwiper={handleInit}
              a11y={false}
              modules={[Mousewheel]}
              mousewheel={true}
              {...sliderSettings}
            >
              {items.map((item, i) => (
                <SwiperSlide className={styles['trainers-item']} key={i}>
                  <StudioGuideSlide data={item}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className={styles['trainers-slider__items']}>
            {items.map((item, i) => (
              <StudioGuideSlide data={item} key={i}/>
            ))}
          </div>
        )}
      
      </div>
    ) : (<p className={styles['error']}>Эта секция пока что пуста</p>)}
    </Container>
  );
};

export default StudioGuideVideoSlider;