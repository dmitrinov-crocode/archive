'use client';

import Container from '@/Components/Container';
import Slider from '@/Components/Slider';
import styles from './Trainers.module.scss'

const Trainers = ({ alias, fields }) => {
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
    const fio = item.find((field) => field.name === 'fio');
    const description = item.find((field) => field.name === 'description');
    const experience = item.find((field) => field.name === 'experience');
    const directions = item.find((field) => field.name === 'directions');
    const phone = item.find((field) => field.name === 'phone');
    const image = item.find((field) => field.name === 'image');
    const video = item.find((field) => field.name === 'video');

    return {
      id: index,
      image: image?.value || '',
      fio: fio?.value || '',
      description: description?.value || '',
      experience: experience?.value || '',
      directions: directions?.value || '',
      phone: phone?.value || '',
      video: video?.value || '',
    };
  });

  return (
    <section id={alias} className={styles.trainers}>
      <Container size="XL">
        <Slider title={title.value} items={slides} name={'trainers'}/>
      </Container>
    </section>
  );
};

export default Trainers;