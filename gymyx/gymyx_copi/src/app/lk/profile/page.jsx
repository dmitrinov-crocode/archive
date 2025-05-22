'use client';

import ProfileHeading from '@/Sections/Account/ProfileHeading';
import ProfileTrainings from '@/Sections/Account/ProfileTrainings';
import ProfileStats from '@/Sections/Account/ProfileStats';
import ProfileContactOptions from '@/Sections/Account/ProfileContactOptions';
import ProfileContacts from '@/Sections/Account/ProfileContacts';
import ProfileMailing from '@/Sections/Account/ProfileMailing';
import ProfileTextField from '@/Sections/Account/ProfileTextField';
import ProfileBalace from '@/Components/Account/Profile/ProfileBalace';
import ProfileGid from '@/Sections/Account/ProfileGid';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import ProfileLogoutHeader from '@/Components/Account/Profile/ProfileLogoutHeader';
import Loading from '@/Components/Loading';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/Utils/updateDataUser';

const Profile = () => {
  const { data: sessionData, update } = useSession();
  const [modalBirthisShow, setModalBirthisShow] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  const userData = () => {
    if(sessionData?.user) {
      getUserData(sessionData?.user?.accessToken)
      .then(res => {
        if(res?.data) {
          setModalBirthisShow(!res?.data?.birth)
          update(res?.data)
        }
        else signOut({ callbackUrl: '/lk/login' });
        setLoading(false)
      })
    }
  }

  const modalHandlerClick = () => {
    router.push('/lk/profile/edit')
  }

  useEffect(() => {
    userData()
  }, [sessionData?.user?.accessToken])

  if (loading) return <Loading full_screen={true} />;
  

  return (
    <>
    {modalBirthisShow && (
      <Modal text={'Укажите свою дату рождения, чтобы мы могли радовать вас каждый год :)'}>
        <Button
          onClick={modalHandlerClick}
          fullSize={true}
          size="l"
          label="Редактировать"
          variant="blue-gradient"
          disabledShadow={true}
        />
      </Modal>
    )}

      <div className="account-page-wrapper">
        <ProfileLogoutHeader/>
        <ProfileHeading />
        <ProfileBalace/>
        <ProfileTrainings isShowTranfer={true}/>
        <ProfileGid/>
        <ProfileStats />
        <ProfileContactOptions>
          <ProfileMailing />
          <ProfileContacts />
        </ProfileContactOptions>
        <ProfileTextField />
      </div>
    </>
  );
};

export default Profile;
