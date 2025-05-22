import { v4 as uuidv4 } from 'uuid';

export const checkValidPhone = (value) => {
  const cleanedPhoneNumber = value.replace(/\D/g, '');

  return {
    value: cleanedPhoneNumber,
    valid: /^7[3-9]{1}[0-9]{9}$/.test(cleanedPhoneNumber),
  };
};

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  const country = cleaned.slice(0, 1);
  const region = cleaned.slice(1, 4);
  const firstBlock = cleaned.slice(4, 7);
  const secondBlock = cleaned.slice(7, 9);
  const thirdBlock = cleaned.slice(9, 11);

  const formattedNumber = `+${country} (${region}) ${firstBlock}-${secondBlock}-${thirdBlock}`;

  return formattedNumber;
};

export const getFioShort = (fio) => {
  if (fio != '') {
    const fioData = fio.split(' ');
    return `${fioData[0]} ${fioData[1] !== undefined ? fioData[1].charAt(0) : ''}`;
  }
  return fio;
};

export const generateBookingDates = (count = 31) => {
  const currentDate = new Date();
  const dates = [];

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);

    const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'short' });
    const dayOfMonth = date.getDate();
    const monthNumber = date.getMonth() + 1;
    const monthLabel = date.toLocaleDateString('ru-RU', { month: 'long' });
    const year = date.getFullYear();

    dates.push({
      id: i,
      dayOfMonth,
      dayOfWeek,
      month: {
        number: monthNumber,
        label: monthLabel,
      },
      year,
    });
  }

  return dates;
};

export const formatDate = (inputDate) => {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const date = new Date(inputDate);
  const day = date.getDate();
  const month = months[date.getMonth()];
  let year = date.getFullYear();
  if (new Date().getFullYear() === year) {
    year = '';
  }
  return `${day} ${month} ${year}`;
};

export const formatTime = (inputTime) => {
  const timeArray = inputTime.split(':');
  const hours = parseInt(timeArray[0], 10);
  const minutes = parseInt(timeArray[1], 10);

  if (!isNaN(hours) && !isNaN(minutes)) {
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  } else {
    return '';
  }
};

// export const uniqueUserData = () => {
//   if(localStorage.getItem('uniqueUserId')) {
//     // console.log('uniqueUserId', true)
//   } else {
//     // console.log('uniqueUserId', false)
//     localStorage.setItem('uniqueUserId', uuidv4())
//   }
//   // console.log(localStorage.getItem('uniqueUserId'))
//   return localStorage.getItem('uniqueUserId')
// }

const setCookie = (name, value) => {
  // Устанавливаем дату истечения на максимально возможную
  const expires = 'Fri, 31 Dec 9999 23:59:59 GMT';
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

export const uniqueUserData = () => {
  const storageKey = 'uniqueUserId';

  // Получаем UUID из localStorage и куков
  const localStorageUUID = localStorage.getItem(storageKey);
  const cookieUUID = getCookie(storageKey);

  // Если UUID есть в обоих местах, но они разные
  if (localStorageUUID && cookieUUID && localStorageUUID !== cookieUUID) {
    // console.warn('UUID рассинхронизирован. Используем localStorage и синхронизируем куки.');
    setCookie(storageKey, localStorageUUID);
    return localStorageUUID;
  }

  // Если UUID есть только в localStorage — сохраняем его в куки
  if (localStorageUUID && !cookieUUID) {
    setCookie(storageKey, localStorageUUID);
    return localStorageUUID;
  }

  // Если UUID есть только в куках — сохраняем его в localStorage
  if (cookieUUID && !localStorageUUID) {
    localStorage.setItem(storageKey, cookieUUID);
    return cookieUUID;
  }

  // Если UUID нигде нет — генерируем новый, сохраняем в оба хранилища
  const newUUID = uuidv4();
  localStorage.setItem(storageKey, newUUID);
  setCookie(storageKey, newUUID);
  return newUUID;
};
