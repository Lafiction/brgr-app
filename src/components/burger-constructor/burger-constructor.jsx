import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useDrop} from 'react-dnd';
import {v1 as uuid} from 'uuid';
import {
  CurrencyIcon,
  Button,
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
import {getOrderNumber} from '../../services/actions/get-order-number';
import ConstructorIngredients from '../constructor-ingredients/constructor-ingredients';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const {bun, ingredients} = useSelector(state => state.burgerConstructor);
  const showModal = useSelector(state => state.orderDetails.showOrderModal);
  const order = useSelector(state => state.orderDetails.order);
  const storeIngredients = useSelector(state => state.allIngredients.allIngredients);

  const [{currentBun}, drop] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      currentBun: monitor.isOver()
    }),
    drop(item) {
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
    collect: monitor => ({
      currentIngredient: monitor.isOver()
    }),
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        item: {
          ...item,
          payload: storeIngredients.find(ingredient => ingredient._id === item._id),
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
    const orderedBuns = [bun._id, bun._id];
    const orderedIngredients = ingredients.map((ingredient) => ingredient._id);  
    dispatch(getOrderNumber(orderedBuns.concat(orderedIngredients)));
    dispatch({type: SHOW_ORDER});
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

      <div className={clsx(styles.ingredients, 'mt-15 ml-8 mb-2')} ref={drop}>
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

      <div className={clsx(styles.items, 'ml-8') } ref={dropTargerRef}>
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
          <CurrencyIcon/>
        </div>
        <Button size='large' disabled={!bun} onClick={handleOpenModal}>Оформить заказ</Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
