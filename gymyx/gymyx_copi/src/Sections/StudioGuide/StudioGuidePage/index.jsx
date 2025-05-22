'use client'

import styles from './StudioGuidePage.module.scss'

import { useState} from 'react'

import NavigationBack from '@/Sections/Account/NavigationBack'
import StudioGuideSwitcher from '../StudioGuideSwitcher'
import StudioGuideVideoSlider from '../StudioGuideVideoSlider'
import StuduiGuideGuide from '../StuduiGuideGuide'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { pauseAllVideo } from '@/Utils/video'

const StudioGuidePage = ({data}) => {
  const [switcherIdActive, setSwitcherIdActive] = useState(0)
  const [slider, setSlider] = useState();

  const findFields = (alias) => {
    return data?.find(module => module.alias === alias)?.fields
  } 


  const findAllFields = (alias) => {
    return data?.filter(el => el.alias === alias)
  }

  const studioGuideVideo = findFields('studioGuideVideo')
  const studioGuideHelper = findAllFields('studioGuideHelper')
  const studioGuideRules = findAllFields('studioGuideRules')

  const SwitcherData = [
    {title: 'гайд'},
    {title: 'видео'},
  ]

  const sliderSettings = {
    spaceBetween: 0,
    slidesPerView: 1,
    observer: false,
    observeParents: false,
    breakpoints: {
      992: {
        allowTouchMove: false,
      },
    },
  };

  const onChangeSlide = () => {
    pauseAllVideo()
    setSwitcherIdActive(slider.activeIndex)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const handlerClick = (id) => {
    if(slider) {
      setSwitcherIdActive(id)
      slider.slideTo(id)
    }
  }

  if(!data) return (<p className={styles['stubio-guide__error']}>Страница не найдена</p>)

  return (
    <section className={styles['stubio-guide']}>
      <NavigationBack buttonLabel={'назад'} link='/lk/profile'/>
      <StudioGuideSwitcher data={SwitcherData} handlerClick={handlerClick} activeId={switcherIdActive}/>
      
        <Swiper
          style={{width: '100%', zIndex: '0'}}
          onSlideChange={onChangeSlide}
          onSwiper={setSlider}
          a11y={false}
          autoHeight={true}
          {...sliderSettings}
        >

        <SwiperSlide>
          <StuduiGuideGuide helperData={studioGuideHelper} rulesData={studioGuideRules} active={switcherIdActive == 0}/>
        </SwiperSlide>

        <SwiperSlide>
          <StudioGuideVideoSlider videoData={studioGuideVideo}/>
        </SwiperSlide>

        
      </Swiper>
    </section>
  )
}

export default StudioGuidePage