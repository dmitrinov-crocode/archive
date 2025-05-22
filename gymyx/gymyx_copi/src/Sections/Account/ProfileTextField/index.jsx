'use client'

import ProfileBlockTitle from "@/Components/Account/Profile/ProfileBlockTitle"
import ProfileTextFiedBlock from "@/Components/Account/Profile/ProfileTextFiedBlock"
import Container from "@/Components/Container"
import styles from "./ProfileTextField.module.scss"

import { useState, useEffect } from "react"

const ProfileTextField = () => {
  const [textFiedIsFocus, setTextFiedIsFocus] = useState(false)
  const [isMobile, setIsModile] = useState(false)

  useEffect(() => {
    setIsModile((window.innerWidth < 768))
  }, [textFiedIsFocus])

  return (
    <section className={`${styles["profile-text-field"]} ${textFiedIsFocus && isMobile ? styles["profile-text-field--focus"] : ''}`}>
      <Container size="M">
        <div className={`${styles["profile-text-field__wrapper"]} `}>
          <ProfileBlockTitle label={"Обратная связь "} />
          <ProfileTextFiedBlock  setFocus={setTextFiedIsFocus}/>
        </div>
      </Container>
    </section>
  )
}

export default ProfileTextField
