import { getCookie, setCookie } from '../../utils/cookie';
import {   
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  SET_AUTH
} from './constants';
import { getUser } from './get-user';
import { checkResponse, BURGER_API } from '../api';
import { AppDispatch, AppThunk } from '../../services/hooks';
import { TLoginForm } from '../../utils/types';

interface IGetAuthRequest {
  readonly type: typeof GET_AUTH_REQUEST;
}
interface IGetAuthSuccess {
  readonly type: typeof GET_AUTH_SUCCESS;
}
interface IGetAuthFailed {
  readonly type: typeof GET_AUTH_FAILED;
}

interface ISetAuth {
  readonly type: typeof SET_AUTH;
  readonly payload: TLoginForm;
}

export type TLoginActions =
  | IGetAuthRequest
  | IGetAuthSuccess
  | IGetAuthFailed
  | ISetAuth;

function getAuthRequest() {
  return {
    type: GET_AUTH_REQUEST
  }
}
function getAuthSuccess(data: any) {
  return {
    type: GET_AUTH_SUCCESS,
    form: data.user,
  }
}
function getAuthFaled() {
  return {
    type: GET_AUTH_FAILED
  }
}

export const login: AppThunk = (form) => {
  return function (dispatch: AppDispatch) {
    dispatch(getAuthRequest());
    fetch(`${BURGER_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('accessToken') as string,
      },
      body: JSON.stringify(form),
    })
    .then(checkResponse)
    .then((data) => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      dispatch(getUser());
      dispatch(getAuthSuccess(data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(getAuthFaled());
    });
  };
}
