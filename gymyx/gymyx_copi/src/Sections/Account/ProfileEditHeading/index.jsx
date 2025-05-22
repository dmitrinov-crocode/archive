import Container from '@/Components/Container';
import NavigationBack from '@/Sections/Account/NavigationBack';
import styles from './ProfileEditHeading.module.scss';

const ProfileEditHeading = ({ isButtonBack = true, buttonLabel, sectionTitle }) => {
  return (
    <section className={styles['profile-edit-heading']}>
      {isButtonBack && <NavigationBack containerSize="M" buttonLabel={buttonLabel} link={'/lk/profile'} />}
      <Container size="M">
        <div className={styles['profile-edit-heading__wrapper']}>
          <p className={styles['profile-edit-heading__title']}>{sectionTitle}</p>
        </div>
      </Container>
    </section>
  );
};

export default ProfileEditHeading;
