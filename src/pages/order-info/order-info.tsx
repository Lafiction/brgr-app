import { useEffect } from 'react';
import { getUser } from '../../services/actions/get-user';
import OrderInfo from '../../components/order-info/order-info';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/websocket';
import { getCookie } from '../../utils/cookie';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

export function OrderInfoPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(store => store.ws.messages);
  
  useEffect(() => {
    dispatch(getUser());
    dispatch(wsConnectionStart(`?token=${getCookie('accessToken')?.split('Bearer ').join('')}`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <>
      {data && <OrderInfo details={data} />}
    </>
  );
};
