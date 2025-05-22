import { useSession } from 'next-auth/react';
import styles from './ProfileInfo.module.scss';
import { EditIcon } from '../../../../../public/svg';
import Link from 'next/link';

const ProfileInfo = () => {
  const { data: sessionData } = useSession();

  const userData = {
    name: sessionData?.user?.full_name?.split(' ')[0] || '',
    lastname: sessionData?.user?.full_name?.split(' ')[1] || '',
    image: sessionData?.user?.image || '',
    enter_code: sessionData?.user?.enter_code || null,
    is_active_enter_code: sessionData?.user?.is_active_enter_code || null,
  }

  return (
    <div className={styles['profile-info']}>
      <div className={styles['profile-info__avatar']}>
        <img className={styles['profile-info__img']} src={userData.image || '/icons/account.svg'} alt="image profile" />
      </div>
      <div className={styles['profile-info__content']}>
        <p className={styles['profile-info__title']}>
          <span className={styles['profile-info__name']}>{userData.name}</span>
          <span className={styles['profile-info__last-name']}>
            {userData.lastname}
            <Link href='/lk/profile/edit' className={styles['profile-info__edit-icon']}><EditIcon/></Link>
          </span>
        </p>
        {userData.enter_code && (
          <div className={`${styles['profile-info__code']}`}>
            <p className={styles['profile-info__code-text']}>код доступа</p>
            <p className={`${styles['profile-info__code-value']} ${userData?.is_active_enter_code ? styles['active'] : ''}`}>
              {userData.enter_code}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileInfo;
