import BorderLabel from '@/Components/BorderLabel';
import Container from '@/Components/Container';
import styles from './AboutUs.module.scss';
import AboutUsItem from '@/Components/AboutUs/AboutUsItem';

const AboutUs = ({ alias, fields }) => {
  const title = fields.find((item) => item.name === 'title');
  const list = fields.find((item) => item.name === 'list')?.childrens || [];

  return (
    <section id={alias} className={styles['about-us']}>
      <Container size="XL">
        <div className={styles['about-us__wrapper']}>
          <BorderLabel label={'кто мы?'} />
          <h2 className={styles['about-us__title']}>{title?.value}</h2>
          <div className={styles['about-us__content']}>
            <BorderLabel label={'как это работает?'} />
            <div className={styles['about-us__list']}>
              {list.map((item, index) => (
                <AboutUsItem key={item[0].value} title={index + 1} text={item[0].value} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
