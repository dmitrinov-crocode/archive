'use client';

import styles from './Studio.module.scss';
import Switcher from './Switcher'
import Container from '@/Components/Container';
import SectionTitle from '@/Components/SectionTitle';
import { useEffect, useState, useRef } from 'react';

const Studio = ({ alias, fields }) => {
  const [showStudio, setShowStudio] = useState(false);
  const title = fields.find((item) => item.name === 'title')?.value;
  const model = fields.find((item) => item.name === '3dmodel')?.value;
  const video = fields.find((item) => item.name === 'video')?.value;
  const poster = fields.find((item) => item.name === 'poster')?.value;
  const [switchActiveId, setSwitchActiveId] = useState(0)
  const [videoIsPlay, setVideoIsPlay] = useState(false)
  const videoRef = useRef(null)

  const data = [
    {lable: '3D модель', name: 'model', data: model},
    {lable: 'видео', name: 'video', data: video},
  ].filter(data => !!data.data)

  const showStudioFc = () => {
    if (window.scrollY >= document.querySelector('#studio').getBoundingClientRect().top - 300) {
      if (showStudio === false) {
        setShowStudio(true);
      }
    }
  };

  const setActiveSwitcher = (id) => {
    setSwitchActiveId(id)
    if(videoRef) {
      setVideoIsPlay(false)
      videoRef.current.pause()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', showStudioFc);
    if(videoRef?.current && !poster) {
      videoRef.current.currentTime += 0.1;
    }

    return () => window.removeEventListener('scroll', showStudioFc);
  }, []);

  return (
    <section id={alias} className={styles.studio}>
      <Container size="XL">
        <div className={styles['studio__wrapper']}>
          <div className={styles['studio__title-wrapper']}>
            <SectionTitle title={title} width="content"></SectionTitle>
            <div className={styles['studio__switcher']}>
              {data.map((switcher, i) => {
                if(switcher?.data) {
                  let position = null
                  if(data.length == 1) position = 'alone'
                  else position = (i == data.length-1) ? 'right' : !i ? 'left' : null;
                  return (<Switcher 
                    key={i}
                    active={switchActiveId == i} 
                    label={switcher.lable} 
                    position={position} 
                    id={i} 
                    setActive={setActiveSwitcher}/>)
                }
              })}
            </div>
          </div>
          <div className={`${styles['studio__content']}`}>
            {data.map((data, i) => {
              if(data.name == 'model') return showStudio ? <iframe key={i} src={model} frameBorder="0" className={`${styles['studio__iframe']} ${i != switchActiveId ? styles['studio__iframe--hidden'] : ''}`}></iframe> : null
              if(data.name == 'video') return <video key={i} ref={videoRef} poster={poster || ''} playsInline className={`${styles['studio__video']} ${i != switchActiveId ? styles['studio__video--hidden'] : ''}`} controls>
                <source src={data.data} type="video/mp4"/>
              </video>
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Studio;
