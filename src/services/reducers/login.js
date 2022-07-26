import {
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  SET_AUTH,
} from '../actions/constants';

const initialState = {
  form: { email: '', password: '' },
  authRequest: false,
  authFailed: false,
  accessToken: '',
  isAuth: false,
};
  
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_REQUEST:
      return {
        ...state,
        authRequest: true,
        isAuth: true,
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        authRequest: false,
        isAuth: true,
      };
    case GET_AUTH_FAILED:
      return {
        ...state,
        authRequest: false,
        authFailed: true,
        isAuth: false,
      };
    case SET_AUTH:
      return {
        ...state,
        form: action.payload,
      };
    default:
      return state;
  }
};
