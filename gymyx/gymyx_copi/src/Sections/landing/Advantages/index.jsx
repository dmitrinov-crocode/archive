'use client';

import Container from '@/Components/Container';
import Slider from '@/Components/Slider';
import styles from './Advantages.module.scss';

const Advantages = ({ alias, fields }) => {
  const title = fields.find((item) => item.name === 'title');
  const list = fields.find((item) => item.name === 'list')?.childrens || [];
  
  const sortedList = list.sort((a, b) => {
    const aHasValidVideo = a.some(item => item.name === 'video' && item.value.trim() !== '');
    const bHasValidVideo = b.some(item => item.name === 'video' && item.value.trim() !== '');
    if (aHasValidVideo && !bHasValidVideo) return -1;
    if (!aHasValidVideo && bHasValidVideo) return 1;
    return 0;
  });

  const slides = sortedList.map((item, index) => {
    const title = item.find((field) => field.name === 'title');
    const subtitle = item.find((field) => field.name === 'subtitle');
    const image = item.find((field) => field.name === 'image');
    const video = item.find((field) => field.name === 'video');

    return {
      id: index,
      image: image?.value || '',
      title: title?.value || '',
      text: subtitle?.value || '',
      video: video?.value || '',
      alt: title?.value || '',
    };
  });

  return (
    <section id={alias} className={styles.advantages}>
      <Container size="XL">
        <Slider title={title?.value} items={slides} />
      </Container>
    </section>
  );
};

export default Advantages;
