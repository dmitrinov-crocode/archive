import styles from './TrainingItems.module.scss';

import { useState, useEffect } from 'react';
import BookingCard from '@/Components/Booking/BookingCard';

const TrainingItems = ({
  items = [],
  archive,
  selectedDate,
  handleDeleteItem,
  handleUpdateDate,
  handlerChangeTraining,
  deleteItem,
  handleShow,
  token,
  modalType
}) => {

  const [renderingItems, setRenderingItems] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const filteredItems = items
        .filter((training) => training.date === selectedDate.date)
        .sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`))
      setRenderingItems(filteredItems);
    } else {
      setRenderingItems(archive ? items.reverse() : items)
    }
  }, [items, selectedDate, archive]);

  return (
    <div className={styles['training-items']}>
      <div className={styles['training-items__list']}>
        {renderingItems.map(({ id, date, time, gym }) => {
          return (
            <BookingCard
              id={id}
              isSingle={archive}
              older={archive}
              onClickDelete={() => handleDeleteItem(id)}
              onClickChangeTraining={handlerChangeTraining}
              key={id}
              date={date}
              time={time}
              gymTitle={gym?.name}
              address={gym?.address}
              modalType={modalType}
              isTraining={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrainingItems;
