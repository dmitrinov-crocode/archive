import styles from './CheckoutConfirm.module.scss';

import Container from '@/Components/Container';

const CheckoutConfirm = ({ handleChangeCanSubmit, isActive }) => {
  return (
    <div onClick={handleChangeCanSubmit} className={styles['checkout-confirm']}>
      <Container>
        <div className={`${styles['checkout-confirm__wrapper']}`}>
          <div className={`${styles['checkout-confirm__btn']} ${isActive ? styles['isActive'] : ''}`}></div>
          <p className={styles['checkout-confirm__text']}>С <a target="_blank" href="https://gymyx.ru/offer.pdf">пользовательским соглашением</a> ознакомлен и согласен</p>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutConfirm;
