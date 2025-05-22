import styles from './Input.module.scss';
import InputMask from 'react-input-mask';
import { memo } from 'react';

const Input = memo(({ refElement, type = '', maxLength, onChange, placeholder }) => {
  if (type === 'tel') {
    return (
      <div className={styles.input}>
        <InputMask
          ref={refElement}
          onChange={onChange}
          className={styles.input__field}
          mask="+7 (999) 999-99-99"
          maskChar="_"
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
    );
  } else if (type === 'number') {
    return (
      <div className={styles.input}>
        <InputMask
          ref={refElement}
          onChange={onChange}
          className={styles.input__field}
          mask="9999"
          maskChar=""
          placeholder={placeholder}
          alwaysShowMask={true}
          autoComplete="off"
        />
      </div>
    );
  } else {
    return (
      <div className={styles.input}>
        <input
          type="text"
          maxLength={maxLength}
          ref={refElement}
          onChange={onChange}
          className={styles.input__field}
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
    );
  }
});

Input.displayName = 'Input';

export default Input;
