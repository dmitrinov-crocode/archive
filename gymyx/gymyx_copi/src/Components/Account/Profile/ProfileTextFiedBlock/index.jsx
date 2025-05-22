'use client'

import { sendMessage } from '@/Sections/Account/ProfileTextField/helpers';
import styles from './ProfileTextFiedBlock.module.scss';
import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const ProfileTextFiedBlock = ({
  setFocus
}) => {
  const { data: sessionData } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [height, setHeight] = useState(0)
  const textarea = useRef(null)

  const handleSendMessage = (text) => {
    if (text !== '') {
      setIsLoading(true);
      sendMessage(sessionData?.user?.accessToken, text).then((data) => {
        if (data?.data?.message === 'Сообщение доставлено') {
          setText('');
          setIsLoading(false);
        }
      });
    }
  };

  const textAreaInput = () => {
    setText(prev => {
      const value = textarea.current.value

      if(window.innerWidth >= 768) {
        textarea.current.style.height = 'auto';
        textarea.current.style.height = textarea.current.scrollHeight+'px'
      }

      // if(prev.length > value.length) {
      //   textarea.current.style.height = 'auto';
      //   textarea.current.style.height = textarea.current.scrollHeight+'px'
      // } else {
      //   textarea.current.style.height = textarea.current.scrollHeight+'px'
      // }
      return value
    })
  }

  return (
    <div className={styles['profile-textfied-block']}>
      <textarea
          ref={textarea}
          placeholder="Расскажите о плохом и хорошем…"
          className={`${styles['profile-textfied-block__input']} ${isLoading ? styles['profile-textfied-block__input--disable'] : ''}`}
          onInput={textAreaInput}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={text}
          rows={1}
      />
      <button className={styles['profile-textfied-block__btn']} onTouchStart={() => handleSendMessage(text)}>
        <img className={styles['profile-textfied-block__btn-icon']} src="/icons/arrowTextFied.svg" alt="" />
      </button>
    </div>
  );
};

export default ProfileTextFiedBlock;
