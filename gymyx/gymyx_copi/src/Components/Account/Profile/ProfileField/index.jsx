'use client';

import styles from './ProfileField.module.scss';
import InputMask from 'react-input-mask';

const ProfileField = ({ onInput = () => {}, readonly = false, value, name, prefix, type = 'text' }) => {
  const handleChange = (e) => {
    onInput(e.target.value, name);
  };
  return (
    <div className={styles['profile-field']}>
      <p className={styles['profile-field__label']}>{prefix}</p>
      {type !== 'tel' && (
        <input
          onChange={handleChange}
          readOnly={readonly}
          value={value}
          name={name}
          className={styles['profile-field__field']}
          type={type}
        />
      )}
      {type === 'tel' && (
        <InputMask
          onChange={handleChange}
          readOnly={readonly}
          name={name}
          value={value}
          className={styles['profile-field__field']}
          mask="+7 (999) 999-99-99"
          maskChar="_"
        />
      )}
    </div>
  );
};

export default ProfileField;
