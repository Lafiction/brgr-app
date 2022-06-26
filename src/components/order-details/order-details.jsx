import clsx from 'clsx';
import styles from './order-details.module.css';
import done from '../../images/done.png'

const OrderDetails = () => {
  return (
    <>
      <div className={clsx(styles.orderId, 'text_type_digits-large')}>034536</div>
      <div className={'text_type_main-medium mt-5 mb-15'}>идентификатор заказа</div>
      <img src={done} />
      <div className='text_type_main-small mt-15 mb-2'>Ваш заказ начали готовить</div>
      <div className='text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</div>
    </>
  );
};

export default OrderDetails;
