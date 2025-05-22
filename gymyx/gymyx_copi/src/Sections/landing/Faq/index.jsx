'use client';

import Container from '@/Components/Container';
import FaqItem from '@/Components/Faq/FaqItem';
import styles from './Faq.module.scss';
import { useEffect, useState } from 'react';

import Button from '@/Components/Button';
import SectionTitle from '@/Components/SectionTitle';

const Faq = ({ alias, fields }) => {
  const [items, setItems] = useState([]);
  const [countShow, setCountShow] = useState(5);
  const title = fields.find((item) => item.name === 'title')?.value || '';

  const handleShowMore = () => {
    setCountShow((prev) => prev + 5);
  };

  useEffect(() => {
    const list = fields.find((item) => item.name === 'items')?.childrens;

    const items = list.map((item, index) => {
      const title = item.find((field) => field.name === 'title')?.value || '';
      const text = item.find((field) => field.name === 'text')?.value || '';

      return {
        id: index,
        qustion: title,
        answer: text,
      };
    });
    setItems(items);
  }, []);

  return (
    <section id={alias} className={styles.faq}>
      <Container size="XL">
        <div>
          <SectionTitle title={title}></SectionTitle>
          <div className={styles['faq__items']}>
            {items.slice(0, countShow).map(({ id, qustion, answer }) => (
              <FaqItem key={id} question={qustion} answer={answer} />
            ))}
          </div>
          {countShow < items.length && (
            <div className={styles.faq__controls}>
              <Button onClick={handleShowMore} label={'Показать ещё'} variant="blue" size="sm" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Faq;
