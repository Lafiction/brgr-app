import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RECOVERY_PASSWORD,
} from '../actions/constants';
import type { TForgotPasswordActions } from '../actions/forgot-password';
  
type TForgotPasswordState = {
  form: {
    email: string;
  };
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
};

export const initialState: TForgotPasswordState = {
  form: {
    email: '',
  },
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
};
  
export const forgotPasswordReducer = (
  state = initialState,
  action: TForgotPasswordActions
): TForgotPasswordState => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: true,
      };
    }
    case RECOVERY_PASSWORD: {
      return {
        ...state,
        form: action.payload,
      };
    }
    default:
      return state;
  }
};
