import GidInfo from './GidInfo';
import styles from './GidItem.module.scss';
import GidItemContent from './GidItemContent';

const GidItem = (props) => {
  const {
    description,
    isViewed,
    link,
    time,
    tags,
    duration,
    isFavorited,
    title,
    video_poster,
    onClickFavorite,
    onClickVideo,
  } = props;

  return (
    <div className={styles['gid-item']}>
      <div className={styles['gid-item__wrapper']}>
        <GidItemContent
          link={link}
          duration={duration}
          title={title}
          lock={isFavorited}
          isViewed={isViewed}
          video_poster={video_poster}
          onClickFavorite={onClickFavorite}
          onClickVideo={onClickVideo}
        />
        <GidInfo trainingTime={time} description={description} tags={tags}/>
      </div>
    </div>
  );
};

export default GidItem;
