import styles from './Loading.module.scss';
import Image from 'next/image';

const Loading = ({ full_screen = false, background = false }) => {
  return (
    <div
      className={`${styles.loading} ${full_screen ? styles['full-screen'] : ''} ${ background ? styles['background'] : ''}`}
    >
      <div className={styles['loading__img-wrapper']}>
        <Image className={styles.loading__img} src="/loading.gif" width="35" height="35" alt="Loading" />
      </div>
      <p className={styles['loading__text']}>Идёт загрузка</p>
    </div>
  );
};

export default Loading;
