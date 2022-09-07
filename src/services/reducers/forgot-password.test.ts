import { forgotPasswordReducer, initialState } from './forgot-password';
import type { TForgotPasswordActions } from '../actions/forgot-password';
import * as types from '../actions/constants';

const form = {
  email: 'test123456@ya.ru',
};

describe('forgot password reducer', () => {
  it('should return the initial state', () => {
    expect(forgotPasswordReducer(undefined, {} as TForgotPasswordActions)).toEqual(
      initialState
    );
  });

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(
      forgotPasswordReducer(initialState, {
        type: types.FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      forgotPasswordRequest: true,
    });
  });

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    expect(
      forgotPasswordReducer(initialState, {
        type: types.FORGOT_PASSWORD_FAILED,
      })
    ).toEqual({
      ...initialState,
      forgotPasswordRequest: false,
      forgotPasswordFailed: true,
    });
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      forgotPasswordReducer(initialState, {
        type: types.FORGOT_PASSWORD_SUCCESS,
        form: form,
      })
    ).toEqual({
      ...initialState,
      forgotPasswordRequest: false,
    });
  });

  it('should handle RECOVERY_PASSWORD', () => {
    expect(
      forgotPasswordReducer(initialState, {
        type: types.RECOVERY_PASSWORD,
        payload: form,
      })
    ).toEqual({
      ...initialState,
      form: form,
    });
  });
});
