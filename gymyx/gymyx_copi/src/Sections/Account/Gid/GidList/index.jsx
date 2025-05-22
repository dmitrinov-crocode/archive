import GidItem from '@/Components/Account/Gid/GidItem';
import Container from '@/Components/Container';

import styles from './GidList.module.scss';
import { useSession } from 'next-auth/react';

import { addFavoriteExerciser, deleteFavoriteExerciser, addWatchedExerciser } from './helpers';

const GidList = ({ items = [], activeTags = [], updateData }) => {
  const { data: sessionData } = useSession();

  const filteredItems = (type = 'some') => {
    // type = 'some' 'every'
    return items.filter(item => {
      const tagNames = item.tags.map(tag => tag.name);

      if(type == 'some' && activeTags.length) {
        return activeTags.some(activeTag => tagNames.includes(activeTag));
      } else if(type == 'every') {
        return activeTags.every(activeTag => tagNames.includes(activeTag));
      } else {
        return items
      }
    });
  }

  const handleToggleFavorite = (id, isFavorited) => {
    if (isFavorited) {
      deleteFavoriteExerciser(sessionData?.user?.accessToken, id).then((data) => {
        updateData(id);
      });
    } else {
      addFavoriteExerciser(sessionData?.user?.accessToken, id).then((data) => {
        updateData(id);
      });
    }
  };

  const handleClickWatched = (id) => {
    addWatchedExerciser(sessionData?.user?.accessToken, id);
  };

  return (
    <section className={styles['grid-list']}>
      <Container size='xl'>
        {!items.length 
        ? <p className={styles['grid-list__message']}>{'Пока что здесь пусто =('}</p>
        : !filteredItems().length 
        ? <p className={styles['grid-list__message']}>По выбранным фильтрам видео не найдены</p>
        : (
          <div className={styles['grid-list__wrapper']}>
            {filteredItems().map(({id, ...rest }) => (
              <GidItem
                key={id}
                {...rest}
                onClickFavorite={() => handleToggleFavorite(id, rest.isFavorited)}
                onClickVideo={() => handleClickWatched(id)}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default GidList;
