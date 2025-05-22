"use client"

import Container from "@/Components/Container"
import { useState } from "react"
import styles from "./TrainingContent.module.scss"

const TrainingContent = ({ children }) => {
  return (
    <section className={styles["training-content"]}>
      <Container>
        <div className={styles["training-content__wrapper"]}>{children}</div>
      </Container>
    </section>
  )
}

export default TrainingContent
