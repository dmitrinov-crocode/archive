'use client'

import { useState, useRef } from 'react';
import { pauseAllVideo } from '@/Utils/video';
import styles from './GidItemContent.module.scss';

const GidItemContent = ({ duration, link, title, lock, isViewed, video_poster, onClickFavorite, onClickVideo }) => {
  const [isShowBg, setIsShowBg] = useState(true)
  const videoRef = useRef(null)

  const handleClickPlay = () => {
    pauseAllVideo()
    setIsShowBg(false)
    videoRef.current.play()
  };

  const handlerPause = () => {
    setIsShowBg(true)
    videoRef.current.controls = false
  }

  const playVideo = () => {
    videoRef.current.play()
    videoRef.current.controls = true
    onClickVideo()
  }

  const handlerEndVideo = () => {
    setIsShowBg(true)
    videoRef.current.controls = false
    videoRef.current.load()
  }

  const videoSeeked = () => {
    setIsShowBg(false)
    videoRef.current.controls = true
    videoRef.current.play()
  }

  const videoSeeking = () => {
    setIsShowBg(false)
    videoRef.current.controls = true
  }

  return (
    <div className={styles['gid-item-content']}>
      <div className={styles['gid-item-content__inner']}>

        <div className={styles['gid-item-content__video-wrapper']}>
          <video 
            ref={videoRef} 
            className={styles['gid-item-content__video']} 
            playsInline poster={video_poster} 
            onPlay={playVideo} 
            onPause={handlerPause} 
            onEnded={handlerEndVideo}
            onSeeked={videoSeeked}
            onSeeking={videoSeeking}
          >
            <source src={link} type="video/mp4"/>
          </video>
        </div>
        
        <div className={`${styles['gid-item-content__befor']} ${!isShowBg ? styles['gid-item-content__befor--hidden'] : ''}`}>
          <div className={styles['gid-item-content__befor-inner']}>
            <button type='button' className={`${styles['gid-item-content__btn-lock']} ${lock ? styles['active'] : ''}`} onClick={onClickFavorite}>
              <img className={styles['gid-item-content__btn-icon']} src="/icons/key.svg" alt="lock  icon button" />
              <span className={styles['gid-item-content__btn-text']}>{lock ? 'Закреплено' : 'Закрепить'}</span>
            </button>
            <button type='button' className={styles['gid-item-content__btn-play']} onClick={handleClickPlay}>
              <span className={styles['gid-item-content__btn-play-icon']}>
                <svg viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.3619 14.6075C31.6802 15.946 31.6802 19.2922 29.3619 20.6307L5.28858 34.5294C2.97025 35.8679 0.0723305 34.1948 0.0723305 31.5178L0.0723305 3.72037C0.0723305 1.04339 2.97025 -0.62972 5.28858 0.70877L29.3619 14.6075Z" fill="white"/>
                </svg>
              </span>
            </button>
            <div className={styles['gid-item-content__about']}>
              <p className={styles['gid-item-content__title']}>{title}</p>
              {isViewed && (
                <p className={styles['gid-item-content__status']}>
                  <span className={styles['gid-item-content__status-icon']}>
                    <img src="/icons/confirm.svg" alt="confirm icon" />
                  </span>
                  <span className={styles['gid-item-content__status-text']}>просмотрено</span>
                </p>
              )}
            </div>
            <p className={styles['gid-item-content__time']}>{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GidItemContent;
