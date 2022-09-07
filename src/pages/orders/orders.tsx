import { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { getUser } from '../../services/actions/get-user';
import { ProfileMenu } from '../../components/profile-menu/profile-menu';
import { FeedItem } from '../../components/feed-item/feed-item';
import OrderInfo from '../../components/order-info/order-info';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/websocket';
import { CLOSE_DETAILS, SHOW_DETAILS } from '../../services/actions/constants';
import { getDetails } from '../../services/actions/get-details';
import Modal from '../../components/modal/modal';
import { TOrders } from '../../utils/types';
import { getCookie } from '../../utils/cookie';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import styles from './orders.module.css';

type TLocationState = {
  main?: Location<TLocationState>;
  from?: { pathname: string };
};

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const isUser = useAppSelector(store => store.user.isUser);
  const data = useAppSelector(store => store.ws.orders);
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
    dispatch(getUser());
    dispatch(wsConnectionStart(`?token=${getCookie('accessToken')?.split('Bearer ').join('')}`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  if (!isUser) {
    history.push('/login');
  }

  return (
    <section className={styles.container}>
      {showDetails && (
        <Modal onClose={handleCloseModal} header=''>
          <OrderInfo details={data} />
        </Modal>
      )}
      <ProfileMenu activeLink={'history'} />
      <div className={styles.items}>
        {data && data.length !== 0
          ? data?.map(data => {
              return (
                <Link
                  key={data._id}
                  className={styles.link}
                  to={{
                    pathname: `/profile/orders/${data._id}`,
                    state: { main: location },
                  }}
                >
                  <FeedItem data={data} handleOpenModal={handleOpenModal} />
                </Link>
              );
            })
          : null}
      </div>
    </section>
  );
};
