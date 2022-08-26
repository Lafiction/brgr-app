import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import OrderInfo from '../../components/order-info/order-info';
import {
  wsConnectionStart,
  wsConnectionClosed,
} from '../../services/actions/websocket';
import styles from './feed-info.module.css';

export function FeedInfoPage() {
  const dispatch = useAppDispatch();
  const details = useAppSelector(store => store.ws.messages);

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {details && <OrderInfo details={details} />}
    </div>
  );
}
