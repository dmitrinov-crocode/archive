'use client';

import Container from '@/Components/Container';
import styles from './ChooseHealth.module.scss';
import Image from 'next/image';

const ChooseHealth = ({ alias, fields }) => {
  const image = fields.find((item) => item.name === 'image')?.value || '';
  const image_mobile = fields.find((item) => item.name === 'image_mobile')?.value || '';

  return (
    <section id={alias} className={styles['choose-health']}>
      <Container size="XL">
        <picture className={styles['choose-health__image']}>
          <source media="(max-width: 992px)" srcSet={image_mobile} />
          <Image src={image} alt="choose health image" width={1920} height={1080} quality={100} loading="lazy" />
        </picture>
      </Container>
    </section>
  );
};

export default ChooseHealth;
