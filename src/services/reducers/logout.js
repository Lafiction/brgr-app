import {
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
} from '../actions/constants';
  
const initialState = {
  logout: false,
  logoutRequest: false,
  logoutFailed: false,
};
  
export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGOUT_REQUEST:
      return {
        ...state,
        logoutRequest: true,
      };
    case GET_LOGOUT_SUCCESS:
      return {
        ...state,
        logoutRequest: false,
        logout: true,
      };
    case GET_LOGOUT_FAILED:
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
        logout: false,
      };
    default:
      return state;
  }
};
