"use client"

import { useEffect } from "react"
import styles from "./Modal.module.scss"

const Modal = ({ handleClose = () => {}, text, size, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.height = "0"
    return () => {
      document.body.style.overflow = "unset"
      document.body.style.height = "unset"
    }
  }, [])
  return (
    <div className={styles.modal}>
      <div
        onClick={() => handleClose((prev) => !prev)}
        className={styles.modal__backdrop}
      ></div>
      <div className={`${styles.modal__wrapper} ${styles[`modal__wrapper--${size || 'default'}`]}`}>
        {text && (<p className={styles.modal__text}>{text}</p>)}
        <div className={styles.modal__controls}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
