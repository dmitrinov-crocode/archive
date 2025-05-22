import { checkValidPhone } from '@/Utils/helpers';

export function convertDate(date, type= 'toISO') {
  // type = toISO || toLocal
  if(!date) return ''
  if (type === 'toISO') {
    // Ожидаем формат DD.MM.YYYY и конвертируем в YYYY-MM-DD
    const [day, month, year] = date.split('.');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } else if (type === 'toLocal') {
    // Ожидаем формат YYYY-MM-DD и конвертируем в DD.MM.YYYY
    const [year, month, day] = date.split('-');
    return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
  } else {
    return 'Invalid type specified';
  }
}

export function isValidDate(date) {
  if (date.length === 10) {
    const [day, month, year] = date.split('.').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const minDate = new Date("1900-01-01");
    const maxDate = new Date();

    if (inputDate < minDate) {
      return false
    } else if (inputDate > maxDate) {
      return false
    } else {
      return true
    }
  }
}

export const checkDataDifference = (prevData, newData) => {
  if (prevData.email !== newData.email.value) {
    return true;
  }

  if (prevData.full_name !== `${newData.name.value} ${newData.lastname.value}`) {
    return true;
  }

  if (prevData.image !== newData.image.value && newData.image.value != null) {
    return true;
  }

  if (prevData.phone !== checkValidPhone(newData.phone.value).value) {
    return true;
  }

  if (convertDate(prevData.birth, 'toLocal') !== newData.birth.value && '' !== newData.birth.value) {
    return true;
  }

  return false;
};