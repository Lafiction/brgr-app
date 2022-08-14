import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from '../actions/constants';
import type { TIngredientsActions } from '../actions/get-ingredients';
import { TIngredient } from '../../utils/types';

type TIngredientsState = {
  ingredientsRequest: boolean;
  ingredientsError: boolean;
  allIngredients: Array<TIngredient>;
};

export const initialState: TIngredientsState = {
  ingredientsRequest: false,
  ingredientsError: false,
  allIngredients: [], 
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
  case GET_INGREDIENTS_REQUEST:
    return {
      ...state,
      ingredientsRequest: true,
      ingredientsError: false
    };
  case GET_INGREDIENTS_SUCCESS:
    return {
      ...state,
      allIngredients: action.allIngredients,
      ingredientsRequest: false,
      ingredientsError: false
    };
  case GET_INGREDIENTS_ERROR:
    return {
      ...state,
      allIngredients: [],
      ingredientsRequest: false,
      ingredientsError: true
    };
  default:
    return state;
  }
};