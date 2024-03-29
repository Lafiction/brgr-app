import React, { useMemo } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Location } from 'history';
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CLOSE_DETAILS, SHOW_DETAILS } from '../../services/actions/constants';
import { getDetails } from '../../services/actions/get-details';
import { TabFixed } from '../../services/fix-ui-components';
import { TIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

type TLocation = {
  main?: Location<TLocation>;
  from?: { pathname: string };
};

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<TLocation>();
  const history = useHistory();

  const {allIngredients} = useAppSelector(store => store.allIngredients);
  const details = useAppSelector(store => store.ingredientDetails.details);
  const showDetails = useAppSelector(store => store.ingredientDetails.showDetails);

  const buns = useMemo(
    () => allIngredients.filter(ingredient => ingredient.type === 'bun'),
    [allIngredients]
  );
  const sauces = useMemo(
    () => allIngredients.filter(allIngredients => allIngredients.type === 'sauce'),
    [allIngredients]
  );
  const mains = useMemo(
    () => allIngredients.filter(allIngredients => allIngredients.type === 'main'),
    [allIngredients]
  );

  const [current, setCurrent] = React.useState('bun');

  function openModal(ingredient: TIngredient) {
    dispatch(getDetails(ingredient));
    dispatch({type: SHOW_DETAILS});
  }

  function closeModal() {
    dispatch({type: CLOSE_DETAILS});
    history.goBack();
  }

  function scrollToBlock(ingredient: any) {
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

  const scroll = (ingredient: React.SetStateAction<string>): void => {
    setCurrent(ingredient);
    let ref: any = null;
    switch (ingredient) {
      case 'bun':
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
        <TabFixed value='bun' active={current === 'bun'} onClick={ingredient => scroll(ingredient)}>
          Булки
        </TabFixed>
        <TabFixed value='sauce' active={current === 'sauce'} onClick={ingredient => scroll(ingredient)}>
          Соусы
        </TabFixed>
        <TabFixed value='main' active={current === 'main'} onClick={ingredient => scroll(ingredient)}>
          Начинки
        </TabFixed>
      </div>

      <div className={styles.ingredientsContainer} onScroll={scrollToBlock}>
        <h2 className='text_type_main-medium' ref={tabBun}>Булки</h2>
        <div className={styles.ingredients}>
          {buns.map(ingredient => 
            <Link
              key={ingredient._id}
              to={{
                pathname: `ingredients/${ingredient._id}`,
                state: {main: location},
              }}
              className={styles.description}
            >
              <BurgerIngredient
                ingredient={ingredient}
                handleOpenModal={openModal}
              />
            </Link>
          )}
        </div>

        <h2 className='text_type_main-medium' ref={tabSauce}>Соусы</h2>
        <div className={styles.ingredients}>
          {sauces.map(ingredient =>
            <Link
              key={ingredient._id}
              to={{
                pathname: `ingredients/${ingredient._id}`,
                state: {main: location},
              }}
              className={styles.description}
            >
              <BurgerIngredient
                ingredient={ingredient}
                handleOpenModal={openModal}
              />
            </Link>
          )}
        </div>

        <h2 className='text_type_main-medium' ref={tabMain}>Начинки</h2>
        <div className={styles.ingredients}>
          {mains.map(ingredient =>
            <Link
              key={ingredient._id}
              to={{
                pathname: `ingredients/${ingredient._id}`,
                state: {main: location},
              }}
              className={styles.description}
            >
              <BurgerIngredient
                ingredient={ingredient}
                handleOpenModal={openModal}
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
