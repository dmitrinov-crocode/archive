"use client";

import AccountLoginForm from "@/Components/Account/Login/AccountLoginForm";
import styles from "./LoginAuth.module.scss";
import Modal from "@/Components/Modal";
import { useState } from "react";
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";

const LoginAuth = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowLoading, setIsShowLoading] = useState(true)

  return (
    <>
    {isShowLoading && <Loading full_screen={true} background={true}/>}
    
    <section className={styles["account-auth"]}>
      <div className={styles["account-auth__wrapper"]}>
        {isShowModal && (
          <Modal handleClose={setIsShowModal} text={"Неверный код"}>
            <Button
              onClick={() => setIsShowModal((prev) => !prev)}
              size="l"
              fullSize={true}
              variant="blue-gradient"
              label="Понятно"
              disabledShadow={true}
            />
          </Modal>
        )}
        <AccountLoginForm
          handleToogleModal={() => setIsShowModal((prev) => !prev)}
          setIsShowLoading={setIsShowLoading}
        />
      </div>
    </section>
    </>
    
  );
};

export default LoginAuth;
