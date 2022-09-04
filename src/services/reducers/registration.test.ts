import { registrationReducer, initialState } from './registration';
import type { TRegistrationActions } from '../actions/registration';
import * as types from '../actions/constants';

const form = {
  name: 'Elena',
  email: 'test123456@ya.ru',
  password: '123456',
};

describe('registration reducer', () => {
  it('should return the initial state', () => {
    expect(registrationReducer(undefined, {} as TRegistrationActions)).toEqual(
      initialState
    );
  });

  it('should handle GET_REGISTRATION_REQUEST', () => {
    expect(
      registrationReducer(initialState, {
        type: types.GET_REGISTRATION_REQUEST,
      })
    ).toEqual({
      ...initialState,
      registrationRequest: true,
    });
  });

  it('should handle GET_REGISTRATION_FAILED', () => {
    expect(
      registrationReducer(initialState, {
        type: types.GET_REGISTRATION_FAILED,
      })
    ).toEqual({
      ...initialState,
      registrationRequest: false,
      registrationFailed: true,
    });
  });

  it('should handle GET_REGISTRATION_SUCCESS', () => {
    expect(
      registrationReducer(initialState, {
        type: types.GET_REGISTRATION_SUCCESS,
        form: form,
      })
    ).toEqual({
      ...initialState,
      registrationRequest: false,
      form: form,
    });
  });

  it('should handle SET_REGISTRATION', () => {
    expect(
      registrationReducer(initialState, {
        type: types.SET_REGISTRATION,
        payload: form,
      })
    ).toEqual({
      ...initialState,
      form: form,
    });
  });
});
