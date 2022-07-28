import {   
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from './constants';
import { checkResponse, BURGER_API } from '../api';

function resetPasswordRequest() {
  return {
    type: RESET_PASSWORD_REQUEST
  }
}
function resetPasswordSuccess(data) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    form: data.user,
  }
}
function resetPasswordFaled() {
  return {
    type: RESET_PASSWORD_FAILED
  }
}

export function resetPassword(form) {
  return async function (dispatch) {
    dispatch(resetPasswordRequest());
    await fetch(`${BURGER_API}/auth/password-reset/reset`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(checkResponse)
      .then((data) => {
        dispatch(resetPasswordSuccess(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(resetPasswordFaled());
      });
  };
}
