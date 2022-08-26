import { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { FeedItem } from '../../components/feed-item/feed-item';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import OrderInfo from '../../components/order-info/order-info';
import {
  wsConnectionStart,
  wsConnectionClosed,
} from '../../services/actions/websocket';
import { TOrders } from '../../utils/types';
import Modal from '../../components/modal/modal';
import { getDetails } from '../../services/actions/get-details';
import {
  CLOSE_DETAILS,
  SHOW_DETAILS
} from '../../services/actions/constants';
import clsx from 'clsx';
import styles from './feed.module.css';

type TLocationState = {
  main?: Location<TLocationState>;
  from?: { pathname: string };
};

export const FeedPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<TLocationState>();
  
  const data = useAppSelector(store => store.ws.messages);
  const total = useAppSelector(store => store.ws.total);
  const totalToday = useAppSelector(store => store.ws.totalToday);
  const showDetails = useAppSelector(store => store.ingredientDetails.showDetails);

  function handleOpenModal(data: TOrders) {
    dispatch(getDetails(data));
    dispatch({ type: SHOW_DETAILS });
  }

  function handleCloseModal() {
    dispatch({ type: CLOSE_DETAILS });
    history.goBack();
  }

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);


  const doneOrders = data
    ? data?.filter((ingredient: any) => ingredient.status === 'done')
    : null;

  const pendingOrders = data
    ? data?.filter((ingredient: any) => ingredient.status === 'pending')
    : null;

  return (
    <section className={styles.container}>
      {showDetails && (
        <Modal onClose={handleCloseModal} header=''>
          <OrderInfo details={data} />
        </Modal>
      )}
      <p className='text text_type_main-large mb-6'>Лента заказов</p>
      <div className={styles.feed}>
        <div className={styles.feedItems}>
          {data && data.length !== 0
            ? data?.map((data: any) => {
              return (
                <Link
                  key={data._id}
                  className={styles.link}
                  to={{
                    pathname: `/feed/${data._id}`,
                    state: { main: location },
                  }}
                >
                  <FeedItem data={data} handleOpenModal={handleOpenModal} />
                </Link>
              );
            })
          : null}
        </div>
        <div className={'ml-15'}>
          <div className={styles.orders}>
            <div className={styles.ready}>
              <p className={'text text_type_main-medium mb-6'}>Готовы:</p>
              {doneOrders?.slice(0, 6).map((elem: any) => (
                <p className={clsx(styles.readyNumber, 'mb-2 text text_type_digits-default')} key={elem.number}>
                  {elem.number}
                </p>
              ))}
            </div>
            <div className={styles.ready}>
              {doneOrders?.slice(6, 12).map((elem: any) => (
                <p className={clsx(styles.readyNumber, 'mb-2 text text_type_digits-default')} key={elem.number}>
                  {elem.number}
                </p>
              ))}
            </div>
            <div>
              <p className={'text text_type_main-medium mb-6'}>В работе:</p>
              <p className={clsx(styles.inProgressNumber, 'text text_type_digits-default mb-2')}
              ></p>
              {pendingOrders?.map((elem: any) => (
                <p className={clsx(styles.inProgressNumber, 'text text_type_digits-default mb-2')} key={elem.number}>
                  {elem.number}
                </p>
              ))}
            </div>
          </div>
          <div className={'mt-15 mb-15'}>
            <p className={'text text_type_main-medium'}>Выполнено за все время:</p>
            <p className={'text text_type_digits-large'}>{total}</p>
          </div>
          <div>
            <p className={'text text_type_main-medium'}>Выполнено за сегодня:</p>
            <p className={'text text_type_digits-large'}>{totalToday}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
