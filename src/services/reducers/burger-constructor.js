import { 
  ADD_BUN,
  ADD_INGREDIENT,
  REPLACE_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_STATE
} from '../actions/constants';

export const initialState = {
  ingredients: []
};

export const burgerConstructorReducer = (state = initialState, action) => {
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