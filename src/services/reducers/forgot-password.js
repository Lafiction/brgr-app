import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RECOVERY_PASSWORD,
} from '../actions/constants';
  
const initialState = {
  form: {
    email: '',
  },
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
};
  
export const forgotPasswordReducer = (state = initialState, action) => {
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
  