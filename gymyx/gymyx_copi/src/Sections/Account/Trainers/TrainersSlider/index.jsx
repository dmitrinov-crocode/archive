'use client';

import styles from './TrainersSlider.module.scss';
import Loading from '@/Components/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState, useEffect } from 'react';
import { Mousewheel } from 'swiper/modules';

import SliderControls from '@/Components/Slider/SliderControls';
import TrainersItem from '../TrainersItem';
import { getTrainersData } from '@/app/lk/trainers/page';
import PageHeading from '../../PageHeading';

const TrainersSlider = ({isShowVideo = false}) => {
  const [dataTrainers, setDataTrainers] = useState();
  const [slider, setSlider] = useState();
  const [activeIndexSlide, setIndexActiveSlide] = useState(1);
  const [sliderSettings, setSliderSettings] = useState(null);
  const [endSlider, setEndSlider] = useState(false);
  const [startSlider, setStartSlider] = useState(true);
  const [loading, setLoading] = useState(true);

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
        spaceBetween: 20,
        slidesPerView: 1.9,
      },

      1200: {
        spaceBetween: 20,
        slidesPerView: 2.3,
      },

      1440: {
        spaceBetween: 30,
        slidesPerView: 2.58,
      },

      1765: {
        spaceBetween: 40,
        slidesPerView: 2.655,
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
    e.activeIndex > 0 ? setStartSlider(false) : setStartSlider(true);
    e.activeIndex === e.slides.length - 2 ? setEndSlider(true) : setEndSlider(false);
  };

  const handleInit = (e) => {
    setSlider(e);
  };

  const sortForVideo = (data) => {
    return data.sort((a, b) => {
      const aHasValidVideo = a.some(item => item.name === 'video' && item.value.trim() !== '');
      const bHasValidVideo = b.some(item => item.name === 'video' && item.value.trim() !== '');
      if (aHasValidVideo && !bHasValidVideo) return -1;
      if (!aHasValidVideo && bHasValidVideo) return 1;
      return 0;
    });
  }

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 992px)').matches;
    isMobile ? handleInit : setSliderSettings(sliderPcSettings);

    getTrainersData().then((dataTrainers) => {
      setDataTrainers(sortForVideo(dataTrainers.data.modules[0].fields[0].childrens));
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading full_screen={true} />;

  return (
    <div className={styles['trainers-slider']}>
      <div className={styles['trainers-slider__title-wrapper']}>
        <PageHeading title={'Тренеры'} container={false} />
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
        <Swiper
          className={`swiper-container ${endSlider ? styles.slider__end : styles.slider} ${
            startSlider ? styles.slider__start__end : styles.slider__start
          }`}
          onSlideChange={onChangeSlide}
          onSwiper={handleInit}
          a11y={false}
          modules={[Mousewheel]}
          mousewheel={true}
          {...sliderSettings}
        >
          {dataTrainers.map((dataTrainers, index) => (
            <SwiperSlide className={styles['trainers-item']} key={dataTrainers[0].value}>
              <TrainersItem data={dataTrainers} key={index} isShowVideo={isShowVideo}/>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles['trainers-slider__items']}>
          {dataTrainers.map((dataTrainers, index) => (
            <TrainersItem key={index} className={styles['trainers-item']} data={dataTrainers} isShowVideo={isShowVideo}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainersSlider;
