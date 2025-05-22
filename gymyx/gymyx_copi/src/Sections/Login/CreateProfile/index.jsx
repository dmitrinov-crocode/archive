'use client';

import { useSession } from 'next-auth/react';
import styles from './CreateProfile.module.scss';
import { useRouter } from 'next/navigation';
import Container from '@/Components/Container';
import ProfileField from '@/Components/Account/Profile/ProfileField';
import Button from '@/Components/Button';
import { useEffect, useRef, useState } from 'react';
import heic2any from 'heic2any';

const validateField = (value, fieldType) => {
  if (fieldType === 'text') {
    return value.length > 0 ? true : false;
  } else if (fieldType === 'email') {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(value);
  } else if (fieldType === 'file') {
    return true;
  }
};

const validateAllFields = (fields) => {
  return Object.values(fields).every((field) => field.isValid);
};

const CreateProfile = () => {
  const { data: sessionData, update: updateSession } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const imagePreviewRef = useRef();
  const [canSubmit, setCanSubmit] = useState(false);
  const [isErrorSubmit, setIsErrorSubmit] = useState(null);
  const [data, setData] = useState({
    name: {
      value: '',
      isValid: false,
      type: 'text',
    },
    lastname: {
      value: '',
      isValid: false,
      type: 'text',
    },
    email: {
      value: '',
      isValid: false,
      type: 'email',
    },
    image: {
      value: null,
      isValid: true,
      type: 'file',
      error: false,
    },
  });

  const handleChangeInput = (value, fieldName) => {
    const sanitizedValue = value.replace(/\s/g, '');
    setData((prev) => {
      return {
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value: sanitizedValue,
          isValid: validateField(sanitizedValue, prev[fieldName].type),
        },
      };
    });
  };
  const handleUploadFile = (e) => {
    const file = e?.target?.files[0];
    const fileExt = file.name.substr(file.name.lastIndexOf('.') + 1);
    if (!file) return;

    if (fileExt.toLowerCase() == 'heic') {
      heic2any({
        blob: file,
        toType: 'image/jpeg',
      }).then(function (resultBlob) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 200;
        canvas.height = 200;

        const image = new Image();
        image.onload = function () {
          ctx.drawImage(image, 0, 0, 200, 200);

          const dataUrl = canvas.toDataURL('image/jpeg');

          imagePreviewRef.current.src = dataUrl;

          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              setData((prev) => ({
                ...prev,
                image: {
                  ...prev.image,
                  value: blob,
                  isValid: true,
                },
              }));
            });

          const inputFile = e.target.files;
          const container = new DataTransfer();
          const newFile = new File([resultBlob], 'heic.jpeg', {
            type: 'image/jpeg',
            lastModified: new Date().getTime(),
          });
          container.items.add(newFile);
          inputFile.files = container.files;
        };

        image.src = URL.createObjectURL(resultBlob);
      });
    }

    if (file?.size / 1024 <= 10240) {
      imagePreviewRef.current.src = window?.URL?.createObjectURL(file);
      setData((prev) => {
        return {
          ...prev,
          image: {
            ...prev['image'],
            value: file,
            isValid: true,
          },
        };
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          image: {
            ...prev['image'],
            value: file,
            isValid: false,
            error: 'Размер файла превышает 10 МБ',
          },
        };
      });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsErrorSubmit(false);
    var myHeaders = new Headers();
    myHeaders.append(`Authorization`, `Bearer ${sessionData.user.accessToken}`);

    var formdata = new FormData();
    formdata.append('full_name', `${data.name.value} ${data.lastname.value}`);
    formdata.append('email', data.email.value);
    if (data.image.value) {
      formdata.append('image', data.image.value);
    }
    formdata.append('_method', 'PUT');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, requestOptions);

    const response = await result.json();
    if (result.ok) {
      updateSession(response.data);
      router.push('/lk/profile');
    } else {
      setIsErrorSubmit(response.error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setCanSubmit(validateAllFields(data));
  }, [data]);

  return (
    <section className={styles['profile-create-form']}>
      <Container size="M">
        <div className={styles['profile-create-form__wrapper']}>
          <div className={styles['profile-create-form__data']}>
            <label className={styles['profile-create-form__avatar']}>
              <input onChange={handleUploadFile} type="file" accept=".jpg, .jpeg, .png, .pdf, .webp, .heic" />
              <img ref={imagePreviewRef} src="/icons/account.svg" alt="preview avatar logo" />
            </label>
            <div className={styles['profile-create-form__data-col']}>
              <ProfileField onInput={handleChangeInput} name={'name'} prefix="Имя" />
              <ProfileField onInput={handleChangeInput} name={'lastname'} prefix="Фамилия" />
              <ProfileField onInput={handleChangeInput} name={'email'} type="email" prefix="E-mail" />
              <br />
              <br />
              <br />
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                size="l"
                label={isLoading ? 'Загрузка' : 'Сохранить'}
                variant="blue"
                fullSize={true}
              />
              {data.image.error && <p className={styles['profile-create-form__message-error']}>{data.image.error}</p>}
              {isErrorSubmit && (
                <p className={styles['profile-create-form__message-error']}>
                  Произошла ошибка отправки. Попробуйте позже!
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreateProfile;
