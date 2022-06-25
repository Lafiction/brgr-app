import React from 'react';
import {
  Tab,
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import burgerPropTypes from '../../utils/types';

const BurgerIngredients = (props) => {
  const ids = ['60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9b7','60666c42cc7b410027a1a9b4', '60666c42cc7b410027a1a9b9', '60666c42cc7b410027a1a9bc']
  const [current, setCurrent] = React.useState('bun');
    return (
      <section className={styles.container}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className={styles.tabs}>
          <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value='main' active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.ingredientsContainer}>
          <h2 className='text_type_main-medium'>Булки</h2>
          <div className={styles.ingredients}>
            {Object.values(props.data.filter(ingredient => ingredient.type === 'bun')).map(ingredient => {
              return (
                <div className={styles.ingredient}>
                  <img src={ingredient.image} />
                  <div className={styles.price}>
                    <span className='text_type_digits-default mr-2'>{ingredient.price}</span>
                    <CurrencyIcon />
                  </div>
                  <span className={'text_type_main-default mt-2'}>{ingredient.name}</span>
                  {ids.includes(ingredient._id) && <Counter count={1} size='default' />}
                </div>
            )})}
          </div>
          <h2 className='text_type_main-medium'>Соусы</h2>
          <div className={styles.ingredients}>
            {Object.values(props.data.filter(ingredient => ingredient.type === 'sauce')).map(ingredient => {
              return (
                <div className={styles.ingredient}>
                  <img src={ingredient.image} />
                  <div className={styles.price}>
                    <span className='text_type_digits-default mr-2'>{ingredient.price}</span>
                    <CurrencyIcon />
                  </div>
                  <span className={'text_type_main-default mt-2'}>{ingredient.name}</span>
                  {ids.includes(ingredient._id) && <Counter count={3} size='default' />}
                </div>
              )})}
          </div>
          <h2 className='text_type_main-medium'>Начинки</h2>
          <div className={styles.ingredients}>
            {Object.values(props.data.filter(ingredient => ingredient.type === 'main')).map(ingredient => {
              return (
                <div className={styles.ingredient}>
                  <img src={ingredient.image} />
                  <div className={styles.price}>
                    <span className='text_type_digits-default mr-2'>{ingredient.price}</span>
                    <CurrencyIcon />
                  </div>
                  <span className={'text_type_main-default mt-2'}>{ingredient.name}</span>
                  {ids.includes(ingredient._id) && <Counter count={2} size='default' />}
                </div>
            )})}
          </div>
        </div>
      </section>
    );
}

BurgerIngredients.propTypes = {
  data: burgerPropTypes.isRequired,
};

export default BurgerIngredients;
