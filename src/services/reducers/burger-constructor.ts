import { 
  ADD_BUN,
  ADD_INGREDIENT,
  REPLACE_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_STATE
} from '../actions/constants';
import type { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TIngredient } from '../../utils/types';

type TConstructorState = {
  ingredients: Array<TIngredient>;
  bun: TIngredient | null;
  totalPrice: number;
  constructorIngredients: Array<TIngredient>;
};

export const initialState: TConstructorState = {
  ingredients: [],
  constructorIngredients: [],
  bun: null,
  totalPrice: 0
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
): TConstructorState => {
  switch (action.type) {
  case ADD_BUN:
    return {
      ...state,
      bun: action.item
    };
  case ADD_INGREDIENT:
    return {
      ...state,
      ingredients: [...state.ingredients, action.item]
    };
  case DELETE_INGREDIENT:
    return {
      ...state,
      ingredients: state.ingredients.filter((item, index) => index !== action.index)
    };
  case REPLACE_INGREDIENT:
    return {
      ...state,
      ingredients: action.optional
    };
  case RESET_STATE:
    return {
      ...initialState
    };
  default:
    return state;
  }
};
