import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { REPLACE_INGREDIENT } from '../../services/actions/constants';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';

import { TIngredient as TElementDetails } from '../../utils/types';

type TIngredient = {
  _id: string;
  dragId: string;
  payload: TElementDetails;
};

type TIngredientProps = {
  ingredients: TIngredient[];
};

const ConstructorIngredients: React.FC<TIngredientProps> = ({ ingredients }) => {
  const dispatch = useDispatch();
  const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);

    dispatch({
      type: REPLACE_INGREDIENT,
      optional: newCards
    });
  }, [ingredients, dispatch]);

  return (
    <>
      {ingredients.map((item: TIngredient, index: number) => (
        <ConstructorIngredient 
          key={item.dragId} 
          index={index} 
          item={item} 
          moveIngredient={moveIngredient}
        />
      ))}
    </>
  );

}

export default ConstructorIngredients;
