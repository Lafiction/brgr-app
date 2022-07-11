import clsx from 'clsx';
import styles from './order-details.module.css';
import done from '../../images/done.png'
import Loader from '../loader/loader';

const OrderDetails = ({order}) => {
  return (
    <div className={styles.order}>
      {order && (
        <>
          <p className={clsx(styles.number, 'text_type_digits-large mt-1 mb-10')}>{order.order.number}</p>
          <p className={'text_type_main-medium mt-5 mb-15'}>идентификатор заказа</p>
          <img src={done} alt='заказ принят'/>
          <div className='text_type_main-small mt-15 mb-2'>Ваш заказ начали готовить</div>
          <div className='text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</div>
        </>
      )}
      {!order && (
        <div className='m-30'>
          <p className='mb-20 text text_color_inactive text_type_main-medium'>Формируем заказ</p>
          <Loader/>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
