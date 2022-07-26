import {   
  GET_DETAILS_REQUEST
} from './constants';

export function getDetails(ingredient) {
  return {
    type: GET_DETAILS_REQUEST,
    details: ingredient
  }
}
