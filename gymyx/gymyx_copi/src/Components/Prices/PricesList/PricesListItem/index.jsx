import styles from './PricesListItem.module.scss';

const PricesListItem = ({ value }) => {
  return (
    <div className={styles['prices-list-item__price-value']}>
      <p className={styles['prices-list-item__price-value-amount']}>{value}&nbsp;</p>
      <p className={styles['prices-list-item__price-value-prefix']}>₽/час</p>
    </div>
  );
};

export default PricesListItem;
