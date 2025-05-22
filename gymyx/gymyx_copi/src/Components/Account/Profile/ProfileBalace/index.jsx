'use client'

import styles from'./ProfileBalace.module.scss'

import Container from '@/Components/Container'
import Button from '@/Components/Button'
import Link from 'next/link'
import { getUserData } from '@/Utils/updateDataUser'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const ProfileBalace = () => {
  const { data: sessionData, update } = useSession();
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if(sessionData?.user) {
      getUserData(sessionData?.user?.accessToken)
      .then(res => {
        if(res?.data) {
          setBalance(res?.data?.balance)
          // update(res?.data)
        }
      })
    }
  }, [sessionData])

  return (
    <Container size='m'>
      <div className={styles.balance}>
        <div className={styles.balance__item}>баланс тренировок: {balance}</div>
        <Link href={'/lk/booking/purchasing-package'}>
          <Button variant="blue-gradient" size="sm" label={'Пополнить'} />
        </Link>
      </div>
    </Container>
  )
}

export default ProfileBalace