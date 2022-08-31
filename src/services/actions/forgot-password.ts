import {   
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RECOVERY_PASSWORD
} from './constants';
import { checkResponse, BURGER_API } from '../api';
import { AppDispatch, AppThunk } from '../../services/hooks';
import type { TForgotPasswordForm } from '../../utils/types';
interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  form: { email: string };
}

interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

interface IResetPassword {
  readonly type: typeof RECOVERY_PASSWORD;
  payload: { email: string };
}

export type TForgotPasswordActions =
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed
  | IResetPassword;

  
function forgotPasswordRequest() {
  return {
    type: FORGOT_PASSWORD_REQUEST
  }
}
function forgotPasswordSuccess(data: any) {
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

export const forgotPassword: AppThunk = (form: TForgotPasswordForm) => {
  return function (dispatch: AppDispatch) {
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
