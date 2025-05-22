"use client"

import { memo, useState } from "react"
import styles from "./AccountCheckBox.module.scss"

const AccountCheckBox = memo(({ value, onChange }) => {
  const handleToggle = () => {
    onChange(!value)
  }

  return (
    <div onClick={handleToggle} className={styles["account-checkbox"]}>
      <div
        className={`${styles["account-checkbox__icon"]} ${
          value ? styles["active"] : ""
        }`}
      ></div>
      <p className={styles["account-checkbox__text"]}>
        Я согласен на обработку{" "}
        <a
          target="_blank"
          href="/"
          className={styles["account-checkbox__link"]}
        >
          персональных данных
        </a>
      </p>
    </div>
  )
})

AccountCheckBox.displayName = 'AccountCheckBox';

export default AccountCheckBox
