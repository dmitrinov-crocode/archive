'use client'

import styles from './StudioGuideSlide.module.scss'

import { useState, useRef } from 'react'
import { pauseAllVideo } from '@/Utils/video'

const StudioGuideSlide = ({data}) => {
  const [videoIsPlay, setVideoIsPlay] = useState(false)
  const videoRef = useRef(null)

  const name = data?.find(el => el.name == 'name')?.value || ''
  const poster = data?.find(el => el.name == 'poster')?.value || ''
  const video = data?.find(el => el.name == 'video')?.value || ''

  const endedVideo = () => {
    videoRef.current.load()
    setVideoIsPlay(false)
  }

  const toggled = () => {
    setVideoIsPlay(prev => {
      pauseAllVideo()
      if(prev) videoRef.current.pause()
      else videoRef.current.play()
    })
  }

  const handlerPauseVideo = () => {
    setVideoIsPlay(false)
  }

  const handlerPlayVideo = () => {
    setVideoIsPlay(true)
  }

  return (
    <div className={styles['studio-guide-slide']}>
      <div className={styles['studio-guide-slide__inner']}>

        <button className={`${styles['studio-guide-slide__btn-play']} ${videoIsPlay ? styles['studio-guide-slide__btn-play--hidden'] : ''}`} onClick={toggled}>
          <span className={styles['studio-guide-slide__btn-icon']}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 51" fill="none">
              <path d="M41.8013 21.3221C44.999 23.1683 44.999 27.7838 41.8013 29.63L7.47686 49.4472C4.27916 51.2934 0.282036 48.9856 0.282036 45.2932L0.282036 5.65884C0.282036 1.96645 4.27916 -0.341295 7.47686 1.5049L41.8013 21.3221Z" fill="white"/>
            </svg>
          </span>
        </button>

        <div className={styles['studio-guide-slide__video-wrapper']}>
          <video ref={videoRef} className={styles['studio-guide-slide__video']} muted  preload='metadata' loading={'eager'} poster={poster} playsInline onPlay={handlerPlayVideo} onPause={handlerPauseVideo} onEnded={endedVideo}>
            <source src={video}/>
          </video>
        </div>

        <div className={styles['studio-guide-slide__befor']} onClick={toggled}>
          <div className={`${styles['studio-guide-slide__befor-inner']} ${videoIsPlay ? styles['studio-guide-slide__befor-inner--hidden'] : ''}`}>
            <div className={styles['studio-guide-slide__name']}>{name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudioGuideSlide