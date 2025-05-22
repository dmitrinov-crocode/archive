'use client';

import Button from '@/Components/Button';
import Container from '@/Components/Container';
import styles from './Hero.module.scss';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const Hero = ({ alias, fields }) => {
  const image = fields.find((item) => item.name === 'image');
  const image_mobile = fields.find((item) => item.name === 'image_mobile');
  const image_medium = fields.find((item) => item.name === 'image_m');
  const title = fields.find((item) => item.name === 'title');
  const subtitle = fields.find((item) => item.name === 'subtitle');
  const price = fields.find((item) => item.name === 'price');
  const bilet_image = fields.find((item) => item.name === 'bilet_image');
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.matchMedia('(max-width: 992px)').matches);
  }, []);

  return (
    <section id={alias} className={styles.hero}>
      <picture className={styles.hero__img}>
        <source media="(max-width: 768px)" srcSet={`${image_mobile?.value}?w=390&h=844`} />
        <source media="(max-width: 1760px)" srcSet={`${image_medium?.value}?w=1440&h=900`} />
        {isMobile ? (
          <Image src={`${image_mobile?.value}`} width={390} height={720} quality={100} alt={title.value} />
        ) : (
          <Image src={`${image?.value}`} width={1920} height={1080} quality={100} alt={title.value} />
        )}
      </picture>
      <div className={styles['hero__billet']}>
        {/* <img src="./images/plashka.svg" alt="" /> */}
        <Image src={bilet_image.value} width={300} height={300}/>
      </div>
      <div className={styles['hero__content-wrapper']}>
        <Container size="XL">
          <div className={styles.hero__content}>
            <h1 className={styles.hero__title}>{title?.value}</h1>
            <h2 className={styles.hero__subtitle}>{subtitle?.value}</h2>
            <div className={styles.hero__info}>
              <p className={styles.hero__price}>
                от
                <span className={styles['hero__price-value']}>
                  {price?.value} <span className={styles['hero__price-prefix']}>₽/час</span>
                </span>
              </p>
              {isMobile ? (
                <Link href={'/lk/login'}>
                  <Button size="l" variant="blue" label={'Записаться'} />
                </Link>
              ) : (
                <Link href={'/lk/login'}>
                  <Button size="l" variant="black" label={'Записаться'} />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
