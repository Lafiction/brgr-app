import { burgerIngredientsReducer, initialState } from './burger-ingredients';
import type { TIngredientsActions } from '../actions/get-ingredients';
import * as types from '../actions/constants';

const items = [
  {
    type: 'bun' as 'bun' | 'sauce' | 'main',
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
    dragId: 'a8b26e36-2c3a-11ed-a261-0242ac120002',
    payload: {
      type: 'bun' as 'bun' | 'sauce' | 'main',
      _id: '60d3b41abdacab0026a733c7',
      __v: 0,
      name: 'Флюоресцентная булка R2-D3',
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      price: 988,
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
    },
  },
];

describe('burger ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(burgerIngredientsReducer(undefined, {} as TIngredientsActions)).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
        burgerIngredientsReducer(initialState, {
        type: types.GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
      ingredientsError: false,
    });
  });

  it('should handle GET_INGREDIENTS_ERROR', () => {
    expect(
        burgerIngredientsReducer(initialState, {
        type: types.GET_INGREDIENTS_ERROR,
      })
    ).toEqual({
      ...initialState,
      allIngredients: [],
      ingredientsRequest: false,
      ingredientsError: true,
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
        burgerIngredientsReducer(initialState, {
        type: types.GET_INGREDIENTS_SUCCESS,
        allIngredients: items,
      })
    ).toEqual({
      ...initialState,
      allIngredients: items,
      ingredientsRequest: false,
      ingredientsError: false,
    });
  });
});
