import React from 'react';
import {
  DragIcon,
  CurrencyIcon,
  Button,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
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
    <section className={clsx(styles.container, 'ml-15')}>
      {showModal &&
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      }

      <div className={clsx(styles.ingredients, 'mt-15')}>
        <ConstructorElement
          type='top'
          text={`${bun[0].name} (верх)`}
          price={bun[0].price}
          thumbnail={bun[0].image_mobile}
          isLocked={true}
        />

        {ingredients.map(ingredient => {
          return (
            <div key={ingredient._id}>
              {ingredient.type !== 'bun' && (
                <div className={styles.ingredient}>
                  <div className={styles.dragIcon}>
                    <DragIcon />
                  </div>
                  <ConstructorElement
                    thumbnail={ingredient.image_mobile}
                    text={ingredient.name}
                    price={ingredient.price}
                  />
                </div>
              )}
            </div>
        )})}

        <ConstructorElement
          type='bottom'
          text={`${bun[0].name} (низ)`}
          price={bun[0].price}
          thumbnail={bun[0].image_mobile}
          isLocked={true}
        />
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
  data: PropTypes.arrayOf(burgerPropTypes).isRequired,
};

export default BurgerConstructor;
