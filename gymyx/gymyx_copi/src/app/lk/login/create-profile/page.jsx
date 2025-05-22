import ProfileEditHeading from '@/Sections/Account/ProfileEditHeading';
import CreateProfile from '@/Sections/Login/CreateProfile';

export const metadata = {
  title: 'Добавить данные пользователя | GYMYX',
  description: 'Добавить данные пользователя | GYMYX',
  manifest: '/manifest.json',
};

const LoginCreateProfile = () => {
  return (
    <div className="account-page-wrapper">
      <ProfileEditHeading isButtonBack={false} sectionTitle={'Добавить данные профиля'} />
      <CreateProfile />
    </div>
  );
};

export default LoginCreateProfile;
