import styles from './BookingVariantsItem.module.scss';

import Image from 'next/image';

const BookingVariantsItem = ({ onClick, title, tagLabel, image, variant, discount = false }) => {
  return (
    <div onClick={onClick} className={`${styles['booking-variants-item']} ${styles[variant]}`}>
      <div className={styles['booking-variants-item__inner']}>
        <h2 className={styles['booking-variants-item__title']}>{title}</h2>
        <div className={styles['booking-variants-item__tag']} variant="transparent">
          {tagLabel}
        </div>

        {discount && (
          <div className={styles['discount']}>
            <div className={styles['discount__inner']}>
              <span className={styles['discount__text']}>{discount?.text}</span>
              <span className={styles['discount__sale']}>{discount?.sale}</span>
            </div>
          </div>
        )}

        {image && (
          <Image className={styles['booking-variants-item__img']} src={image} width={250} height={200} alt='image' />
        )}
      </div>
    </div>
  );
};

export default BookingVariantsItem;
