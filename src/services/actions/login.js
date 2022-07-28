import { getCookie, setCookie } from '../../utils/cookie';
import {   
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED
} from './constants';
import { getUser } from './get-user';
import { checkResponse, BURGER_API } from '../api';

export function login(form) {
  return function (dispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    });
    fetch(`${BURGER_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('accessToken'),
      },
      body: JSON.stringify(form),
    })
    .then(checkResponse)
    .then((data) => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      dispatch(getUser());
      dispatch({
        type: GET_AUTH_SUCCESS,
        form: data.user,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_AUTH_FAILED,
      });
    });
  };
}
