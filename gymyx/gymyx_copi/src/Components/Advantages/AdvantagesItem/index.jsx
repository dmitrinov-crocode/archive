'use client'

import styles from './AdvantagesItem.module.scss';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { pauseAllVideo } from '@/Utils/video';

const AdvantagesItem = ({ props }) => {
  const { image, title, text, alt, video } = props;

  const videoRef = useRef(null)
  const [videoIsPlay, setVideoIsPlay] = useState(false)

  const playVideo = (e) => {
    e.stopPropagation()
    if(videoRef.current) {
      const video = videoRef.current
      if(videoIsPlay) {
        video.pause()
      } else {
        pauseAllVideo()
        video.play()
      }
    }
  }

  const handleVideoEnd = () => {
    setVideoIsPlay(false);
    videoRef.current.load()
  };

  return (
    <div className={styles['advantages-item']}>
      {video && 
        <div className={`${styles['advantages-item__video_play']} ${videoIsPlay ? styles['advantages-item__video_play--hidden'] : ''}`} onClick={playVideo}>
          <svg viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.3619 14.6075C31.6802 15.946 31.6802 19.2922 29.3619 20.6307L5.28858 34.5294C2.97025 35.8679 0.0723305 34.1948 0.0723305 31.5178L0.0723305 3.72037C0.0723305 1.04339 2.97025 -0.62972 5.28858 0.70877L29.3619 14.6075Z" fill="white"/>
          </svg>
        </div>}
      <div className={styles['advantages-item__img']}>
        {video 
        ? <video ref={videoRef} className={styles['advantages-item__video']} playsInline webkit-playsinline poster={image} onEnded={handleVideoEnd} onPause={() => setVideoIsPlay(false)} onPlay={() => setVideoIsPlay(true)}>
            <source src={video} type="video/mp4"/>
          </video>
        : <Image src={image} width={500} height={800} quality={100} alt={title} loading="lazy" />
        }
      </div>
      <div className={styles['advantages-item__content']} onClick={playVideo}>
        <div className={`${styles['advantages-item__content_inner']} ${videoIsPlay ? styles['advantages-item__content_inner--hidden'] : ''}`}>
          <p className={styles['advantages-item__title']}>{title}</p>
          <p className={styles['advantages-item__text']}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesItem;
