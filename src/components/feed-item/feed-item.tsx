import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/hooks';
import { orderDate } from '../../utils/date';
import { TOrders } from '../../utils/types';
import clsx from 'clsx';
import styles from './feed-item.module.css';

type TFeedItem = {
  status?: string;
  data: TOrders;
  handleOpenModal: (elem: TOrders) => void;
};

export const FeedItem: React.FC<TFeedItem> = ({ data, handleOpenModal }) => {
  const location = useLocation();
  const items = useAppSelector(store => store.allIngredients.allIngredients);
 
  const orderStatus: string =
    data.status === 'done'
    ? 'Выполнен'
    : data.status === 'pending'
    ? 'Готовится'
    : data.status === 'created'
    ? 'Создан'
    : '';

  const ingredients = useMemo(() => {
    return data.ingredients
      .map(id => { return items.find((item: any) => item._id === id);})
      .filter(data => data !== undefined)
      .slice(0, 5);
  }, [items, data.ingredients]);

  const otherIngredients =
    data.ingredients.slice(5).length !== 0
    ? {
        number: data.ingredients.slice(5).length,
        id: data.ingredients.slice(5),
      }
    : null;

  const lastIngredientImage = otherIngredients
    ? items.find((item: { _id: string; }) => item._id === otherIngredients.id[0])
    : null;

  const totalPrice = useMemo(() => {
    let total = 0;
    data.ingredients.map((el) => {
      const orderedItems = items.find((data: { _id: string; }) => data._id === el);
      if (orderedItems) {
        total += orderedItems.price || 0;
      }
      return total;
    });
    return total;
  }, [data.ingredients, items]);

  return (
    <div
      className={clsx(styles.container, 'p-5 mb-5')}
      key={data._id}
      onClick={() => handleOpenModal(data)}
    >
      <div className={clsx(styles.header, 'mb-5')}>
        <span className={clsx(styles.number, 'text text_type_digits-default')}>#{data.number}</span>
        <span className='text text_type_main-default text_color_inactive'>{orderDate(data.createdAt)}</span>
      </div>

      <span className={clsx(styles.name, 'text text_type_main-medium')}>{data.name}</span>

      {location.pathname === '/profile/orders' && (
        <p className={clsx(styles.status)} style={{ color: data.status === 'done' ? '#00cccc' : '#fff' }}>
          {orderStatus}
        </p>
      )}

      <div className={clsx(styles.details, 'mt-5')}>
        <div className={styles.ingredients}>
          {data &&ingredients.map((data) => {
            return (
              <div className={styles.item} key={Math.random()}>
                {data && (
                  <img
                    className={styles.image}
                    src={data.image}
                    alt='Ингредиент бургера'
                  />
                )}
              </div>
            );
          })}
          {otherIngredients && (
            <div className={styles.item}>
              <span className={clsx( styles.lastIngredientNumber,'text text_type_main-small')}>
                {`+${otherIngredients.number}`}
              </span>
              <div className={styles.ingredientBackground}></div>
              {data && (
                <img
                  className={styles.image}
                  src={lastIngredientImage?.image}
                  alt='Ингредиент бургера'
                />
              )}
            </div>
          )}
        </div>
        <div className={styles.total}>
          <span className={clsx(styles.number, 'text text_type_digits-default ml-6')}> {totalPrice} </span>
          <div className='ml-2'>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </div>
  );
};
