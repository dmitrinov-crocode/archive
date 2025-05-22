import ProfileEditHeading from "@/Sections/Account/ProfileEditHeading"
import ProfileEditForm from "@/Sections/Account/ProfileEditForm"

const ProfileEdit = () => {
  return (
    <div className="account-page-wrapper">
      <ProfileEditHeading
        buttonLabel={"Назад"}
        sectionTitle={"Редактирование профиля"}
      />
      <ProfileEditForm />
    </div>
  )
}

export default ProfileEdit
