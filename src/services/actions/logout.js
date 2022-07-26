import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import {   
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED
} from './constants';
import { checkResponse } from '../api';
  
export function logout() {
  return function (dispatch) {
    dispatch({
      type: GET_LOGOUT_REQUEST,
    });

    fetch('https://norma.nomoreparties.space/api/auth/logout', {
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
        dispatch({
          type: GET_LOGOUT_SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_LOGOUT_FAILED,
        });
      });
  };
}
