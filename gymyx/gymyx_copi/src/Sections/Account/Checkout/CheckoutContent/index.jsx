'use client';

import { useSelector } from "react-redux"
import { useSession } from "next-auth/react"

import CheckoutList from '@/Components/Checkout/CheckoutList';
import CheckoutSummary from '@/Components/Checkout/CheckoutSummary';
import { getUserData } from "@/Utils/updateDataUser";
import Container from '@/Components/Container';
import styles from "./CheckoutContent.module.scss"
import { useEffect, useState } from "react";

const CheckoutContent = () => {
  const { visitDate, gym } = useSelector((state) => state.booking)
  const { data: sessionData } = useSession();
  const packageBalance = sessionData?.user?.balance || 0
  const [balance, setBalance] = useState(packageBalance)

  useEffect(() => {
    if(sessionData?.user?.accessToken)
    getUserData(sessionData?.user?.accessToken)
    .then(res => {
      if(res?.data) {
        setBalance(res?.data?.balance)
      }
    })
  }, [sessionData, visitDate])

  return (
    <div className={styles['checkout-content']}>
      <Container>
        <div className={styles['checkout-content__wrapper']}>
          <CheckoutList items={visitDate} />
          <CheckoutSummary items={visitDate} gym={gym} isActivePackage={balance > 0} balance={balance}/>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutContent;
