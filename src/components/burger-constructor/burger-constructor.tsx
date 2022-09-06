import { useMemo } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { v1 as uuid } from 'uuid';
import {
  CurrencyIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  SHOW_ORDER,
  CLOSE_ORDER,
  RESET_STATE
} from '../../services/actions/constants';
import { getOrderNumber } from '../../services/actions/get-order-number';
import ConstructorIngredients from '../constructor-ingredients/constructor-ingredients';
import { useHistory } from 'react-router-dom';
import { TIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { ButtonFixed } from '../../services/fix-ui-components';

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isUser = useAppSelector(state => state.user.isUser);
  const { bun, ingredients } = useAppSelector(state => state.burgerConstructor);
  const showModal = useAppSelector(state => state.orderDetails.showOrderModal);
  const order = useAppSelector(state => state.orderDetails.order);
  const storeIngredients = useAppSelector(state => state.allIngredients.allIngredients);

  const [{currentBun}, drop] = useDrop({
    accept: 'bun',
    collect: (monitor: DropTargetMonitor) => ({
      currentBun: monitor.isOver()
    }),
    drop(item: { _id: string }) {
      dispatch({
        type: ADD_BUN,
        item: {
          ...item,
          payload: storeIngredients.find(ingredient => ingredient._id === item._id),
          dragId: uuid()
        }
      });
    }
  });

  const [{ currentIngredient }, dropTargerRef] = useDrop({
    accept: ['sauce', 'main'],
    collect: (monitor: DropTargetMonitor) => ({
      currentIngredient: monitor.isOver()
    }),
    drop(item: { _id: string }) {
      dispatch({
        type: ADD_INGREDIENT,
        item: {
          ...item,
          payload: storeIngredients.find((ingredient: TIngredient) => ingredient._id === item._id),
          dragId: uuid()
        }
      });
    }
  });

  const totalPrice = useMemo(() => {
    let bunPrice = bun ? bun.payload.price * 2 : 0;
    let ingredientsPrice = ingredients.length > 0 ? ingredients.reduce((cur, acc) => acc.payload.price + cur, 0) : 0;
    return ingredientsPrice + bunPrice;
  }, [bun, ingredients]);

  function handleOpenModal() {
    if (isUser) {
      const orderedIngredients: string[] = ingredients.map((ingredient) => ingredient._id);
      orderedIngredients.unshift(bun?._id as string);
      orderedIngredients.push(bun?._id as string);
      dispatch(getOrderNumber(orderedIngredients));
      dispatch({ type: SHOW_ORDER });
    } else {
      history.push('/login');
    }
  }

  function handleCloseModal() {
    dispatch({type: CLOSE_ORDER});
    dispatch({type: RESET_STATE});
  }

  return (
    <section className={clsx(styles.container, 'ml-15')}>
      {showModal &&
        <Modal onClose={handleCloseModal}>
          <OrderDetails order={order} />
        </Modal>
      }

      <div className={clsx(styles.buns, 'mt-15 ml-8 mb-2')} ref={drop}>
        {bun ? (
          <ConstructorElement
            type='top'
            text={`${bun.payload.name} (верх)`}
            price={bun.payload.price}
            thumbnail={bun.payload.image_mobile}
            isLocked={true}
          />
          ) : (
            <div className='m-20'>
              <span className={'text_color_inactive text_type_main-medium'}>Перетащите сюда булку</span>
            </div>
          )}
      </div>

      <div className={clsx(styles.ingredients, 'ml-8') } ref={dropTargerRef}>
        {ingredients.length > 0 ? (
          <ConstructorIngredients ingredients={ingredients}/>
        ) : (
          <div className='m-20'>
            <span className={'text_color_inactive text_type_main-medium'}>Перетащите сюда игредиенты</span>
          </div>
        )}
      </div>

      {bun && (
        <div className='mt-2 ml-8'>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun.payload.name} (низ)`}
            price={bun.payload.price}
            thumbnail={bun.payload.image_mobile}
          />
        </div>
      )}

      <div className={clsx(styles.result, 'mt-10')}>
        <span className='text_type_digits-medium'>{totalPrice}</span>
        <div className='ml-1 mr-7'>
          <CurrencyIcon type='primary' />
        </div>
        <ButtonFixed 
          type='primary' 
          size='large' 
          disabled={!bun} 
          onClick={handleOpenModal}
        >
          Оформить заказ
        </ButtonFixed>
      </div>
    </section>
  );
};

export default BurgerConstructor;
