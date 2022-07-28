import {   
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from './constants';
import { checkResponse, BURGER_API } from '../api';
  
export function resetPassword(form) {
  return async function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    await fetch(`${BURGER_API}/auth/password-reset/reset`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(checkResponse)
      .then((data) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          form: data.user,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}
