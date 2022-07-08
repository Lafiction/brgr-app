import { combineReducers } from 'redux';
import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,

  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  SHOW_ORDER,
  CLOSE_ORDER,

  GET_DETAILS_REQUEST,
  SHOW_DETAILS,
  CLOSE_DETAILS,

  ADD_BUN,
  ADD_INGREDIENT,
  REPLACE_INGREDIENT,
  DELETE_INGREDIENT,
  CALCULATE_PRICE,

  RESET_STATE
} from '../actions/actions';

export const initialState = {
  ingredientsRequest: false,
  ingredientsError: false,
  allIngredients: null, 
  ingredients: [],

  orderRequest: false,
  orderFailed: false,
  order: null,
  showOrderModal: false,

  details: null,
  showDetails: false,
  bun: null,
  totalPrice: 0
};

const burgerIngredientsReducer = (state = initialState, action) => {
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

const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_DETAILS_REQUEST:
    return {
      ...state,
      details: action.details
    };
  case SHOW_DETAILS:
    return {
      ...state,
      showDetails: true
    };
  case CLOSE_DETAILS:
    return {
      ...state,
      showDetails: false,
      details: null
    };

  default:
    return state;
  }
};

const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ORDER_REQUEST:
    return {
      ...state,
      orderRequest: true,
      orderFailed: false
    };
  case GET_ORDER_SUCCESS:
    return {
      ...state,
      orderRequest: false,
      orderFailed: false,
      order: action.order
    };
  case GET_ORDER_ERROR:
    return {
      ...state,
      orderRequest: false,
      orderFailed: true,
      order: null
    };
  case SHOW_ORDER:
    return {
      ...state,
      showOrderModal: true
    };
  case CLOSE_ORDER:
    return {
      ...state,
      showOrderModal: false,
      order: null
    };
  default:
    return state;
  }
};

const burgerConstructorReducer = (state = initialState, action) => {
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
  case CALCULATE_PRICE:
    return {
      ...state,
      totalPrice: state.burgerConstructor.reduce(function (sum, cur) {
        return sum + (cur.price * (cur.type === 'bun' ? 2 : 1));
      }, 0)
    };

  default:
    return state;
  }
};

export const rootReducer = combineReducers({
  allIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer
});
