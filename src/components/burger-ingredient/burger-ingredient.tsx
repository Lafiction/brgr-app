import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';

import { TRootState } from '../../services/reducers/root-reducer';
import { TIngredient } from '../../utils/types';
import { useAppSelector } from '../../services/hooks';

type TIngredientProps = {
  readonly ingredient: TIngredient;
  readonly handleOpenModal: (ingredient: TIngredient) => void;
};

const BurgerIngredient: React.FC<TIngredientProps> = ({ingredient, handleOpenModal}) => {
  const {_id, type, image, name, price} = ingredient;
  const bun = useAppSelector(store => store.burgerConstructor.bun);
  const ingredients = useSelector((store: TRootState) => store.burgerConstructor.ingredients);
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
          <CurrencyIcon type='primary'/>
        </div>
      </div>
      <span className={clsx(styles.ingredientName, 'text_type_main-default')}>{name}</span>
      {count > 0 && 
        <Counter count={count} size='default'/>
      }
    </div>
  );
};

export default BurgerIngredient;
