import {
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  SET_AUTH,
} from '../actions/constants';
import type { TLoginActions } from '../actions/login';
import { TLoginForm } from '../../utils/types';

type TLoginState = {
  form: TLoginForm;
  authRequest: boolean;
  authFailed: boolean;
  accessToken: string;
  isAuth: boolean;
};

export  const initialState: TLoginState = {
  form: { email: '', password: '' },
  authRequest: false,
  authFailed: false,
  accessToken: '',
  isAuth: false,
};
  
export const loginReducer = (
  state = initialState,
  action: TLoginActions
): TLoginState => {
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
