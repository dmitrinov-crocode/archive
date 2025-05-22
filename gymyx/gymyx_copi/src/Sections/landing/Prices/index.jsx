import SectionTitle from '../../../Components/SectionTitle';
import Container from '../../../Components/Container';
import styles from './Prices.module.scss';
import PriceLabel from '../../../Components/Prices/PriceLabel';
import PricesList from '../../../Components/Prices/PricesList';

const Prices = ({ alias, fields }) => {
  const title = fields.find((item) => item.name === 'title')?.value || '';
  const list = fields.find((item) => item.name === 'list')?.childrens || [];
  const first_training_session = fields.find((item) => item.name === 'first_training_session')?.value || 0;

  const listItems = list.map((item) => {
    return { value: item[0].value };
  });

  return (
    <section id={alias} className={styles.prices}>
      <Container size="XL">
        <div className={styles.prices__wrapper}>
          <PriceLabel price={first_training_session} />
          <SectionTitle title={title} />
          <PricesList items={listItems} />
        </div>
      </Container>
    </section>
  );
};

export default Prices;
