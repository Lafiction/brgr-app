import { setCookie } from '../../utils/cookie';
import {   
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED
} from './constants';
import { checkResponse, BURGER_API } from '../api';
  
function getRegistrationRequest() {
  return {
    type: GET_REGISTRATION_REQUEST
  }
}
function getRegistrationSuccess(data) {
  return {
    type: GET_REGISTRATION_SUCCESS,
    form: data.user,
  }
}
function getRegistrationFaled() {
  return {
    type: GET_REGISTRATION_FAILED
  }
}

export function registration(form) {
  return function (dispatch) {
    dispatch(getRegistrationRequest);
    fetch(`${BURGER_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    .then(checkResponse)
    .then((data) => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      dispatch(getRegistrationSuccess(data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(getRegistrationFaled);
    });
  };
}
