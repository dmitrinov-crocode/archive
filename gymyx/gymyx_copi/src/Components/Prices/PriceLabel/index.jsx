import Button from '@/Components/Button';
import styles from './PriceLabel.module.scss';
import Link from 'next/link';

const PriceLabel = ({ price }) => {
  return (
    <div className={styles['price-label']}>
      <p className={styles['price-label__text']}>Первая пробная тренировка</p>
      <div className={styles['price-label__bottom']}>
        <p className={styles['price-label__value']}>{price} ₽/час</p>
        <Link href={'/lk/login'}>
          <Button size="m" variant="black" label={'Записаться'} />
        </Link>
      </div>
    </div>
  );
};

export default PriceLabel;
