import Button from '@/Components/Button';
import Container from '@/Components/Container';
import SectionTitle from '@/Components/SectionTitle';
import Image from 'next/image';
import styles from './BookingHero.module.scss';

const BookingHero = ({ data, handleButtonClick }) => {
  const { name, address, description, image } = data;

  return (
    <section className={styles['booking-hero']}>
      <Container>
        <div className={styles['booking-hero__wrapper']}>
          <div className={styles['booking-hero__bg']}>
            <Image src={image?.src || '/images/hero.png'} alt="gym image" width={1600} height={390} loading="lazy" />
          </div>
          <div className={styles['booking-hero__content']}>
            <SectionTitle align="left" title={name} />

            <p className={styles['booking-hero__text']}>{description}</p>
            <div className={styles['booking-hero__content-inner-wrapper']}>
              <p className={styles['booking-hero__address']}>{address}</p>
              <Button onClick={handleButtonClick} variant="blue" size="m" label={'Изменить зал'} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BookingHero;
