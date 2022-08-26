import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/hooks';
import { orderDate } from '../../utils/date';
import { TIngredient, TOrders } from '../../utils/types';
import clsx from 'clsx';
import styles from './order-info.module.css';

type TDetails = {
  details: TOrders[] | null;
};

export const OrderInfo = ({ details }: TDetails) => {
  const history = useHistory();
  const items = useAppSelector((store) => store.allIngredients.allIngredients);
  const id = history.location.pathname.replace(RegExp('^/[a-z]+/[a-z]+/|^/[a-z]+/'), '');
  const data = details?.filter((elem: TOrders) => elem._id === id)[0];

  const ingredients = useMemo(() => {
    return data?.ingredients
      .map((elem) => {
        return { elem: elem, count: 1 };
      })
      .reduce((a: any, b: { elem: string; count: number }) => {
        console.log(a, b);
        a[b.elem] = (a[b.elem] || 0) + b.count;
        return a;
      }, {});
  }, [data?.ingredients]);

  const countedItems: {
    item: TIngredient | undefined;
    count: number | unknown;
  }[] = Object.entries(ingredients).map(([key, value]) => {
    return { item: items.find((ingredient: any) => ingredient._id === key), count: value };
  });

  const orderStatus: string =
    data?.status === 'done'
      ? 'Выполнен'
      : data?.status === 'pending'
      ? 'Готовится'
      : data?.status === 'created'
      ? 'Создан'
      : '';

  const totalPrice = useMemo(() => {
    let total = 0;
    data?.ingredients.map((elem: string) => {
      const orderedItems = items.find((data: any) => data._id === elem);
      if (orderedItems) {
        total += orderedItems.price || 0;
      }
      return total;
    });
    return total;
  }, [data?.ingredients, items]);

  return (
    <div className={clsx(styles.modal, 'ml-10 mr-10 mt-10 mb-15')}>
      <p className={clsx(styles.number, 'text text_type_digits-default mb-10')}>
        #{data?.number}
      </p>
      <p className={clsx(styles.name, 'text text_type_main-medium mb-3')}>
        {data?.name}
      </p>
      <p className={clsx(styles.status, 'text text_type_main-default mb-15')}>
        {orderStatus}
      </p>
      <p className={clsx(styles.name, 'text text_type_main-medium mb-6')}>
        Состав:
      </p>
      <div className={styles.ingredients}>
        {countedItems.map((data) => {
          return (
            <div className={clsx(styles.item, 'mb-5')} key={Math.random()}>
              <div className={styles.itemDetails}>
                <div className={styles.itemImage}>
                  <img className={clsx(styles.image)} src={data?.item?.image} alt='Ингредиент бургера'/>
                </div>
                <p className={clsx(styles.itemName, 'text text_type_main-default mr-4')}>
                  {data?.item?.name}
                </p>
              </div>

              <div className={styles.total}>
                <span className={clsx(styles.itemPrice, 'text text_type_digits-default')}>
                  <>{data.count} x {data?.item?.price}</>
                </span>
                <div className='ml-2'>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={clsx(styles.bottom, 'mt-10')}>
        <span className='text text_type_main-default text_color_inactive'>
          {orderDate(data?.createdAt as string)}
        </span>
        <div className={styles.totalPrice}>
          <span className={clsx(styles.itemPrice, 'text text_type_digits-default')}> {totalPrice} </span>
          <div className='ml-2'><CurrencyIcon type='primary' /></div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
