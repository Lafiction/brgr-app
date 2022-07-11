import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from '../actions/constants';

export const initialState = {
  ingredientsRequest: false,
  ingredientsError: false,
  allIngredients: null, 
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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