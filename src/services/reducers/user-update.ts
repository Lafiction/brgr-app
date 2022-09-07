import {
  SET_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from '../actions/constants';
import type { TUpdateUserActions } from '../actions/update-user';
import type { TRegistrationForm } from '../../utils/types';

type TUpdateUserState = {
  form: TRegistrationForm;
  getUserRequest?: boolean;
  getUserFailed?: boolean;
  isUpdated?: boolean;
};

export const initialState: TUpdateUserState = {
  form: {
    email: '',
    name: '',
    password: '',
  },
  getUserRequest: false,
  getUserFailed: false,
  isUpdated: false,
};
  
export const userUpdateReducer = (
  state = initialState,
  action: TUpdateUserActions
): TUpdateUserState => {
  switch (action.type) {
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      console.log(state.form, action.form);
      return {
        ...state,
        getUserRequest: false,
        form: { ...state.form, ...action.form },
        isUpdated: true,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
        isUpdated: false,
      };
    }
    case SET_USER: {
      console.log(state.form, action.payload);
      return {
        ...state,
        form: { ...state.form, ...action.payload },
      };
    }
    default:
      return state;
  }
};
