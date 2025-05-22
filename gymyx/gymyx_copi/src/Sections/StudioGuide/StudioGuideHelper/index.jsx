import styles from './StudioGuideHelper.module.scss'

import Container from '@/Components/Container'
import StudioGuideHelperItem from './StudioGuideHelperItem'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

const StudioGuideHelper = ({data, active}) => {
  const title = data.find(el => el.name == 'title')?.value
  const items = data.find(el => el.type == 'object')?.childrens

  const sliderPcSettings = {
    slidesPerView: 3,
    observer: false,
    observeParents: false,
    mousewheel: {
      thresholdDelta: 70,
      forceToAxis: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.5,
      },
      425: {
        slidesPerView: 1.9,
      },
      576: {
        slidesPerView: 2.5,
      },
      768: {
        slidesPerView: 3,
      },
    },
  };

  return (
    <div className={styles['studio-guide-helper']}>
      <Container>
        <div className={styles['studio-guide-helper__inner']}>
          <h2 className={styles['studio-guide-helper__title']}>{title}</h2>
          <div className={`${styles['studio-guide-helper__items']} ${active ? styles['studio-guide-helper__items--active'] : ''}`}>
            {items.length && (
              <Swiper
                style={{padding: '0 20px'}}
                a11y={false}
                modules={[Mousewheel]}
                mousewheel={true}
                speed={1000}
                {...sliderPcSettings}
              >

                {items.map((item, i) => (
                  <SwiperSlide 
                  key={i} 
                  >
                    <StudioGuideHelperItem itemData={item} key={i}/>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default StudioGuideHelper