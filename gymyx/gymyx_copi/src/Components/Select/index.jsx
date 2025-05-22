'use client';

import { useEffect, useState } from 'react';
import styles from './Select.module.scss';

const Select = ({ childrens, onChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [childrenItems, setChildrenItems] = useState([]);
  const [activeItem, setActiveItem] = useState({});

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleChooseItem = (id) => {
    const tempItem = childrenItems.filter(({ id: idItem }) => idItem === id)[0];
    setActiveItem(tempItem);
    handleToggle();
    onChange(tempItem);
  };

  useEffect(() => {
    let filteredChildrens = childrens.filter((item) => item.id !== 'curPosition');
    setChildrenItems(filteredChildrens);
    setActiveItem(childrens[0]);
  }, [childrens]);

  return (
    <div className={`${styles.select} ${isActive ? styles['active'] : ''}`}>
      <div onClick={handleToggle} className={styles.select__preview}>
        <div className={styles.select__value}>{activeItem?.title}</div>
        <div className={styles.select__icon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="17" viewBox="0 0 32 17" fill="none">
            <path
              d="M2 2L15.4249 16L30 2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {childrenItems && (
        <div className={styles.select__content}>
          {childrenItems.map(({ id, title }) => (
            <div onClick={() => handleChooseItem(id)} key={id} className={styles['select__content-item']}>
              {title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
