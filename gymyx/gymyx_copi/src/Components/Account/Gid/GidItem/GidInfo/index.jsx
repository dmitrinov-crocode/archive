import styles from './GidInfo.module.scss';

const GidInfo = ({ description, trainingTime, tags }) => {
  tags = tags.sort((a, b) =>  (a.tag_blue && !b.tag_blue) ? -1 : (!a.tag_blue && b.tag_blue) ? 1 : 0)

  return (
    <div className={styles['gid-item-info']}>
      <div className={styles['gid-item-info__cards']}>
        <div className={styles['gid-item-info__item']}>
          <p className={styles['gid-item-info__item-description']}>{description}</p>
          <ul className={styles['gid-item-info__item-tags']}>
            {tags.map((tag, i) => (
              <li className={`
                ${styles['gid-item-info__item-tag']} 
                ${ tag?.tag_blue ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`} 
                 key={i}>
                  {tag.name}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles['gid-item-info__item']}>
          <div className={styles['gid-item-info__item-title']}>время</div>
          <p className={styles['gid-item-info__item-text']}>{trainingTime}</p>
        </div>

      </div>

      <div className={styles['gid-item-info__item-tags-wrapper']}>
        <ul className={styles['gid-item-info__item-tags--mobile']}>
         {tags.map((tag, i) => (
            <li className={`
              ${styles['gid-item-info__item-tag']} 
              ${ tag?.tag_blue ? styles['gid-item-info__item-tag--main'] : styles['gid-item-info__item-tag--default']}`} 
              key={i}>
                {tag.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GidInfo;
