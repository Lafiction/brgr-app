import React from 'react';
import {
  DragIcon,
  CurrencyIcon,
  DeleteIcon,
  LockIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import styles from './burger-constructor.module.css';
import burgerPropTypes from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const ids = ['60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9b7','60666c42cc7b410027a1a9b4', '60666c42cc7b410027a1a9b9', '60666c42cc7b410027a1a9bc'];
  const ingredients = [];
  props.data.forEach(ingredient => {
    ids.forEach(ingredientId => {
      if (ingredient._id === ingredientId) {
        ingredients.push(ingredient);
      }
    })
  })
  const bun = ingredients.filter(ingredient => ingredient._id === '60666c42cc7b410027a1a9b1');

  function handleOpenModal() {
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }
  
  return (
    <section className={clsx(styles.container, 'm-5')}>
      {showModal &&
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      }

      <div className={clsx(styles.ingridient, 'm-3 p-3')}>
        <img src={bun[0].image_mobile} />
        <span className={clsx(styles.name, 'text_type_main-default mr-3')}>{bun[0].name} (верх)</span>
        <div className={clsx(styles.price, 'mr-5')}>
          <span className='text text_type_digits-default mr-2'>{bun[0].price}</span>
          <CurrencyIcon />
        </div>
        <LockIcon type='secondary' />
      </div>
      
      <div>
        {ingredients.map(ingredient => {
          return (
            <>
              {ingredient.type !== 'bun' && (
                <div className={clsx(styles.ingridient, 'm-3 p-3')}>
                  <div className={styles.dragIcon}>
                    <DragIcon />
                  </div>
                  <img src={ingredient.image_mobile} />
                  <span className={clsx(styles.name, 'text_type_main-default mr-3')}>{ingredient.name}</span>
                  <div className={clsx(styles.price, 'mr-5')}>
                    <span className='text_type_digits-default mr-2'>{ingredient.price}</span>
                    <CurrencyIcon />
                  </div>
                  <DeleteIcon />
                </div>
              )}
            </>
          )})}
        <div className={clsx(styles.ingridient, 'm-3 p-3')}>
          <img src={bun[0].image_mobile} />
          <span className={clsx(styles.name, 'text_type_main-default mr-3')}>Кратерная булка N-200i (низ)</span>
          <div className={clsx(styles.price, 'mr-5')}>
            <span className='text_type_digits-default mr-2'>{bun[0].price}</span>
            <CurrencyIcon />
          </div>
          <LockIcon type='secondary' />
        </div>
      </div>

      <div className={clsx(styles.result, 'mt-10')}>
        <span className='text_type_digits-medium pr-5'>4550</span>
        <CurrencyIcon/>
        <Button size='large' onClick={handleOpenModal}>Оформить заказ</Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: burgerPropTypes.isRequired,
};

export default BurgerConstructor;
