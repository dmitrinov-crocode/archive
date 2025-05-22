'use client';

import styles from './GidePage.module.scss'
import PageHeading from '@/Sections/Account/PageHeading';
import GidList from '@/Sections/Account/Gid/GidList';
import { useState, useEffect } from 'react';
import Loading from '@/Components/Loading';
import { useSession } from 'next-auth/react';
import GideFilter from '@/Sections/Gide/GideFilter';
import GideSwitcher from '@/Sections/Gide/GideSwitcher';
import { getGids, getAllTags, sortByFavorites } from './helper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { pauseAllVideo } from '@/Utils/video';

const GidePage = () => {
  const [tags, setTags] = useState([]);
  const { data: sessionData } = useSession();
  const [activeTags, setActiveTags] = useState([]);
  const [gids, setGids] = useState([]);
  const [gidsData, setGidsData] = useState([])
  const [loading, setLoading] = useState(true);
  const [switcherIdActive, setSwitcherIdActive] = useState(0)
  const [slider, setSlider] = useState();

  const SWITCHER_DATA = [
    {title: 'упражнения'},
    {title: 'комплекс'},
  ]

  const sliderSettings = {
    spaceBetween: 0,
    slidesPerView: 1,
    breakpoints: {
      992: {
        allowTouchMove: false,
      },
    },
  };

  useEffect(() => {
    if (!sessionData?.user?.accessToken) return;
    // setLoading(true);
    getGids(sessionData?.user?.accessToken)
    .then(res => {
      if (res?.data) {
        setGids(res?.data);
        setTags(getAllTags(res?.data))
      }
    })
    .finally(() => setLoading(false))
  }, [sessionData]);

  const filterByType = (type) => {
    return sortByFavorites(gids.filter(gid => gid?.type == type) || [])
  }

  useEffect(() => {
    setGidsData([filterByType('exercise'), filterByType('complex')])
  }, [gids])

  useEffect(() => {
    if(slider) slider.update()
  }, [activeTags])

  const updateData = (id = -1) => {
    if (id > -1) {
      const findedIndex = gids.findIndex((item) => item.id === id);
      let tempGids = [...gids];
      tempGids[findedIndex].isFavorited = !tempGids[findedIndex].isFavorited;
      tempGids = sortByFavorites(tempGids)
      setGids(tempGids);
    }
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
      slider.slideTo(id)
      setSwitcherIdActive(id)
    }
  }

  if (loading) return <Loading full_screen={true} />;
  return (
    <div className={`${styles['gide-page']} ${!switcherIdActive ? styles['gide-page--second'] : ''}`}>
      <PageHeading title={'Онлайн гид'} containerSize='xl'/>
      <GideSwitcher data={SWITCHER_DATA} activeId={switcherIdActive} handlerClick={handlerClick}/>

      {!switcherIdActive && (
        <GideFilter tags={tags} activeTags={activeTags} setActiveTags={setActiveTags}/>
      )}

      {gidsData.length && (
        <Swiper
          style={{width: '100%', zIndex: '0'}}
          onSlideChange={onChangeSlide}
          onSwiper={setSlider}
          a11y={false}
          autoHeight={true}
          {...sliderSettings}
        >
        {gidsData.map((gid, i) => (
          <SwiperSlide key={i} className={styles['gide-page__slide']}>
          <GidList 
            activeTags={!i ? activeTags : []}
            items={gid} 
            updateData={updateData} 
          />
        </SwiperSlide>
        ))}
      </Swiper>
      )}
    </div>
  );
};

export default GidePage;