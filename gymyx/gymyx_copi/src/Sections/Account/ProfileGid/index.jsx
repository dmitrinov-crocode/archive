import styles from './ProfileGid.module.scss'
import Link from 'next/link'

import Container from '@/Components/Container'

const ProfileGid = ({}) => {
  return (
      <div className={styles['profile-gid']}>
        <Container size='m'>
          <Link href={'/lk/studio-guide'} className={styles['profile-gid__inner']}>
            <div className={styles['profile-gid__content']}>
              <p className={styles['profile-gid__title']}>Гид по студии</p>
              <p className={styles['profile-gid__text']}>Видео-инструкции, ответы на самые частые вопросы и правила зала</p>
            </div>
            <div className={styles['profile-gid__aside']}>
              <span className={styles['profile-gid__aside-icon']}>
                <svg viewBox="0 0 42 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M38 18.5H0.68044M38 18.5L22.5787 2.46184M38 18.5L22.5787 34.5382" stroke="white" strokeWidth="5"/>
                </svg>
              </span>
            </div>
          </Link>
        </Container>
      </div>
  )
}

export default ProfileGid