import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import {   
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED
} from './constants';
import { checkResponse, BURGER_API } from '../api';
import { AppDispatch } from '../../services/hooks';

interface IGetLogoutRequest {
  readonly type: typeof GET_LOGOUT_REQUEST;
}

interface IGetLogoutSuccess {
  readonly type: typeof GET_LOGOUT_SUCCESS;
}

interface IGetLogoutFailed {
  readonly type: typeof GET_LOGOUT_FAILED;
}

export type TLogoutActions =
  | IGetLogoutRequest
  | IGetLogoutSuccess
  | IGetLogoutFailed;

function getLogoutRequest() {
  return {
    type: GET_LOGOUT_REQUEST
  }
}
function getLogoutSuccess() {
  return {
    type: GET_LOGOUT_SUCCESS
  }
}
function getLogoutFaled() {
  return {
    type: GET_LOGOUT_FAILED
  }
}

export const logout = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getLogoutRequest());
    fetch(`${BURGER_API}/auth/logout`, {
      method: "POST",
      body: JSON.stringify({
        token: getCookie('refreshToken'),
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(checkResponse)
      .then(() => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(getLogoutSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(getLogoutFaled());
      });
  };
}
