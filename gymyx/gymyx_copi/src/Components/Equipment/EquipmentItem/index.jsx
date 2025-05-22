'use client';

import styles from './EquipmentItem.module.scss';
import Image from 'next/image';

const EquipmentItem = ({ props, id }) => {
  const { title, image, content } = props;

  return (
    <div className={styles['equipment-item']} data-id={id} data-name={title}>
      <p className={styles['equipment-item__title']}>{title}</p>
      <div className={styles['equipment-item__image']}>
        <Image src={image} width={400} height={400} quality={100} alt={title} />
      </div>
      <div id="equipment-item__modal" className={styles['equipment-item__content']}>
        {content}
      </div>
    </div>
  );
};

export default EquipmentItem;
