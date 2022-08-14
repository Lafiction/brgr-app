import { setCookie } from '../../utils/cookie';
import {   
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED,
  SET_REGISTRATION
} from './constants';
import { checkResponse, BURGER_API } from '../api';
import { AppDispatch, AppThunk } from '../../services/hooks';
import type { TRegistrationForm } from '../../utils/types';

interface IGetRegistrationRequest {
  readonly type: typeof GET_REGISTRATION_REQUEST;
}

interface IGetRegistrationSuccess {
  readonly type: typeof GET_REGISTRATION_SUCCESS;
  readonly form: TRegistrationForm;
}

interface IGetRegistrationFailed {
  readonly type: typeof GET_REGISTRATION_FAILED;
}

interface ISetRegistration {
  readonly type: typeof SET_REGISTRATION;
  readonly payload: TRegistrationForm;
}

export type TRegistrationActions =
  | IGetRegistrationRequest
  | IGetRegistrationSuccess
  | IGetRegistrationFailed
  | ISetRegistration;
  
function getRegistrationRequest() {
  return {
    type: GET_REGISTRATION_REQUEST
  }
}
function getRegistrationSuccess(data: any) {
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

export const registration: AppThunk = (form: TRegistrationForm) => {
  return function (dispatch: AppDispatch) {
    dispatch(getRegistrationRequest());
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
      dispatch(getRegistrationFaled());
    });
  };
}
