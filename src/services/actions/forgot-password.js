import {   
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from './constants';
import { checkResponse, BURGER_API } from '../api';
  
function forgotPasswordRequest() {
  return {
    type: FORGOT_PASSWORD_REQUEST
  }
}
function forgotPasswordSuccess(data) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    form: data.user
  }
}
function forgotPasswordFaled() {
  return {
    type: FORGOT_PASSWORD_FAILED
  }
}

export function forgotPassword(form) {
  return function (dispatch) {
    dispatch(forgotPasswordRequest());
    fetch(`${BURGER_API}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
      }),
    })
    .then(checkResponse)
    .then(data => {
      dispatch(forgotPasswordSuccess(data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(forgotPasswordFaled());
    });
  };
}
