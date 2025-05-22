import Container from '@/Components/Container';
import SectionTitle from '@/Components/SectionTitle';
import EquipmentItem from '@/Components/Equipment/EquipmentItem';

import styles from './Equipment.module.scss';

const Equipment = ({ alias, fields }) => {
  const title = fields.find((item) => item.name === 'title')?.value || '';
  const list = fields.find((item) => item.name === 'list')?.childrens || [];

  const items = list.map((item, index) => {
    const title = item.find((field) => field.name === 'title')?.value || '';
    const text = item.find((field) => field.name === 'text')?.value || '';
    const image = item.find((field) => field.name === 'image')?.value || '';

    return {
      id: index,
      title: title,
      image: image,
      content: text,
    };
  });

  return (
    <section id={alias} className={styles.equipment}>
      <Container size="XL">
        <SectionTitle title={title} />
        <div className={styles.equipment__grid}>
          {items.map(({ id, ...props }) => (
            <EquipmentItem key={id} props={props} id={id}/>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Equipment;
