import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {ingredientPropTypes} from '../../utils/types';
import {REPLACE_INGREDIENT} from '../../services/actions/constants';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';

export default function ConstructorIngredients({ingredients}) {
  const dispatch = useDispatch();
  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
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
    ingredients.map((item, index) => (
      <ConstructorIngredient key={item.dragId} index={index} item={item} moveIngredient={moveIngredient}/>
    ))
  );
}

ConstructorIngredients.propTypes = {
  ingredients: ingredientPropTypes.isRequired
};
