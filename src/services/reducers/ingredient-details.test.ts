import { ingredientDetailsReducer, initialState } from './ingredient-details';
import * as types from '../actions/constants';
import type { TDetailsActions } from '../actions/get-details';

const details = {
  type: 'bun',
  _id: '60d3b41abdacab0026a733c6',
  __v: 0,
  name: 'Краторная булка N-200i',
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  price: 1255,
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
};

describe('ingredient details reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, {} as TDetailsActions)).toEqual(
      initialState
    );
  });

  it('should handle GET_DETAILS_REQUEST', () => {
    expect(
      ingredientDetailsReducer(initialState, {
        type: types.GET_DETAILS_REQUEST,
        details: details,
      })
    ).toEqual({
      ...initialState,
      details: details,
    });
  });

  it('should handle SHOW_DETAILS', () => {
    expect(
      ingredientDetailsReducer(initialState, {
        type: types.SHOW_DETAILS,
      })
    ).toEqual({
      ...initialState,
      showDetails: true,
    });
  });

  it('should handle CLOSE_DETAILS', () => {
    expect(
      ingredientDetailsReducer(initialState, {
        type: types.CLOSE_DETAILS,
      })
    ).toEqual({
      ...initialState,
      showDetails: false,
      details: null,
    });
  });
});
