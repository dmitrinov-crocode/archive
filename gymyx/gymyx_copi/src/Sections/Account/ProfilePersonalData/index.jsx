"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import ProfileField from "@/Components/Account/Profile/ProfileField"
import Container from "@/Components/Container"

import styles from "./ProfilePersonalData.module.scss"

const ProfilePersonalData = () => {
  const session = useSession()
  const [userData, setUserData] = useState({})

  useEffect(() => {
    setUserData({
      phone: session?.data?.user?.phone || "",
      email: session?.data?.user?.email || "",
    })
  }, [session])

  return (
    <section>
      <Container size="M">
        <div className={styles["profile-personal-data__col"]}>
          <ProfileField
            readonly={true}
            prefix={"Телефон"}
            value={userData?.phone}
            type="tel"
          />
          <ProfileField
            readonly={true}
            prefix={"E-mail"}
            value={userData?.email}
          />
        </div>
      </Container>
    </section>
  )
}

export default ProfilePersonalData
