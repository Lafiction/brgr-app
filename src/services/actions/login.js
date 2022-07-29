import { getCookie, setCookie } from '../../utils/cookie';
import {   
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED
} from './constants';
import { getUser } from './get-user';
import { checkResponse, BURGER_API } from '../api';

function getAuthRequest() {
  return {
    type: GET_AUTH_REQUEST
  }
}
function getAuthSuccess(data) {
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

export function login(form) {
  return function (dispatch) {
    dispatch(getAuthRequest());
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
      dispatch(getAuthSuccess(data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(getAuthFaled());
    });
  };
}
