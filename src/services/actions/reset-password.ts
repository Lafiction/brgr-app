import {   
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_PASSWORD
} from './constants';
import { checkResponse, BURGER_API } from '../api';
import { AppDispatch, AppThunk } from '../../services/hooks';
import type { TRegistrationForm } from '../../utils/types';

interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  form: TRegistrationForm;
}

interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

interface ISetPass {
  readonly type: typeof SET_PASSWORD;
  payload: {
    password: string;
    token: string;
  };
}

export type TResetPasswordActions =
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | ISetPass;

function resetPasswordRequest() {
  return {
    type: RESET_PASSWORD_REQUEST
  }
}
function resetPasswordSuccess(data: any) {
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

export const resetPassword: AppThunk = (form) => {
  return async function (dispatch: AppDispatch) {
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
