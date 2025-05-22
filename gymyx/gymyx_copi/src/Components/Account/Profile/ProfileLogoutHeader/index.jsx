import styles from './ProfileLogoutHeader.module.scss'
import ProfileLogout from "../ProfileLogout";
import Container from '@/Components/Container';
import { signOut } from 'next-auth/react';

const ProfileLogoutHeader = () => {
  return (
    <section className={styles['profile-logout-header']}>
      <Container size='m'>
        <div className={styles['profile-logout-header__inner']}>
          <ProfileLogout handleClick={() => signOut({ callbackUrl: '/lk/login' })} />
        </div>
      </Container>
    </section>
  )
}

export default ProfileLogoutHeader