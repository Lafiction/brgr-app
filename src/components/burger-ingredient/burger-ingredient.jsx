import {useSelector} from 'react-redux';
import {useDrag} from 'react-dnd';
import clsx from 'clsx';
import {
    Counter,
    CurrencyIcon
  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';

const BurgerIngredient = ({ingredient, handleOpenModal}) => {
  const {_id, type, image, name, price} = ingredient;
  const bun = useSelector(store => store.burgerConstructor.bun);
  const ingredients = useSelector(store => store.burgerConstructor.ingredients);
  const allIngredients = [bun, ...ingredients];
  const count = allIngredients.filter((ingredient) => ingredient?._id === _id).length;

  const [{opacity}, dragRef] = useDrag({
    type: type,
    item: {_id},
    collect: monitor => ({
    opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <div className={clsx(styles.ingredient, 'mb-8')}
      id={_id}
      ref={dragRef}
      style={{opacity}}
      key={_id}
      onClick={() => handleOpenModal(ingredient)}
    >
      <img src={image} alt={name}/>
      <div className={styles.price}>
        <p className='text_type_digits-default mt-1 mb-1 pr-2'>{price}</p>
        <div>
          <CurrencyIcon/>
        </div>
      </div>
      <span className={clsx(styles.ingredientName, 'text_type_main-default')}>{name}</span>
      {count > 0 && 
        <Counter count={count} size='default'/>
      }
    </div>
  );
};

BurgerIngredient.propTypes = {
  handleOpenModal: PropTypes.func.isRequired
};

export default BurgerIngredient;
