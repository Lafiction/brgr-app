import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {CLOSE_DETAILS, SHOW_DETAILS} from '../../services/actions/constants';
import {getDetails} from '../../services/actions/get-details';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const {allIngredients} = useSelector(state => state.allIngredients);
  const details = useSelector((state) => state.ingredientDetails.details);
  const showDetails = useSelector(state => state.ingredientDetails.showDetails);

  const buns = allIngredients.filter(ingredient => ingredient.type === 'bun');
  const sauces = allIngredients.filter(ingredient => ingredient.type === 'sauce');
  const mains = allIngredients.filter(ingredient => ingredient.type === 'main');

  const [current, setCurrent] = React.useState('bun');

  function openModal(ingredient) {
    dispatch(getDetails(ingredient));
    dispatch({type: SHOW_DETAILS});
  }

  function closeModal() {
    dispatch({type: CLOSE_DETAILS});
  }

  function scrollToBlock(ingredient) {
    if (ingredient.target.scrollTop > 0 && ingredient.target.scrollTop < 290) {
      setCurrent('bun');
    } else if (ingredient.target.scrollTop > 290 && ingredient.target.scrollTop < 820) {
      setCurrent('sauce');
    } else if (ingredient.target.scrollTop > 820) {
      setCurrent('main');
    }
  }
  const tabBun = React.useRef(null);
  const tabSauce = React.useRef(null);
  const tabMain = React.useRef(null);

  const scroll = (ingredient) => {
    setCurrent(ingredient);
    let ref = null;
    switch (ingredient) {
      case 'one':
        ref = tabBun;
        break;
      case 'sauce':
        ref = tabSauce;
        break;
      case 'main':
        ref = tabMain;
        break;
      default:
        break;
    }
    ref.current.scrollIntoView({block: 'start', behavior: 'smooth'});
  }

  return (
    <section className={styles.container}>
      { showDetails &&
        <Modal onClose={closeModal} header='Детали ингредиента'>
          <IngredientDetails details={ details } />
        </Modal>
      }
      <h1 className='text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value='bun' active={current === 'bun'} onClick={ingredient => scroll(ingredient)}>
          Булки
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={ingredient => scroll(ingredient)}>
          Соусы
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={ingredient => scroll(ingredient)}>
          Начинки
        </Tab>
      </div>

      <div className={styles.ingredientsContainer} onScroll={scrollToBlock}>
        <h2 className='text_type_main-medium' ref={tabBun}>Булки</h2>
        <div className={styles.ingredients}>
          {Object.values(buns).map(ingredient => 
            <BurgerIngredient
            ingredient={ingredient}
              key={ingredient._id}
              handleOpenModal={openModal}
            />
          )}
        </div>

        <h2 className='text_type_main-medium' ref={tabSauce}>Соусы</h2>
        <div className={styles.ingredients}>
          {Object.values(sauces).map(ingredient =>
            <BurgerIngredient
            ingredient={ingredient}
              key={ingredient._id}
              handleOpenModal={openModal}
            />
          )}
        </div>

        <h2 className='text_type_main-medium' ref={tabMain}>Начинки</h2>
        <div className={styles.ingredients}>
          {Object.values(mains).map(ingredient => 
            <BurgerIngredient
            ingredient={ingredient}
              key={ingredient._id}
              handleOpenModal={openModal}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
