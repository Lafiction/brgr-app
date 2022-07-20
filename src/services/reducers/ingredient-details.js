import { 
GET_DETAILS_REQUEST,
SHOW_DETAILS,
CLOSE_DETAILS
} from '../actions/constants';

export const initialState = {
  details: null,
  showDetails: false,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
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
