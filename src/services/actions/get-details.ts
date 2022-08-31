import {   
  GET_DETAILS_REQUEST,
  SHOW_DETAILS,
  CLOSE_DETAILS
} from './constants';
import { TIngredientDetails, TOrders } from '../../utils/types';

interface IGetDetailsRequest {
  readonly type: typeof GET_DETAILS_REQUEST;
  readonly details: TIngredientDetails;
}

interface IShowDetails {
  readonly type: typeof SHOW_DETAILS;
}

interface ICloseDetails {
  readonly type: typeof CLOSE_DETAILS;
}
 
export type TDetailsActions = IGetDetailsRequest | IShowDetails | ICloseDetails;

export const getDetails = (ingredient: TIngredientDetails | TOrders) => {
  return {
    type: GET_DETAILS_REQUEST,
    details: ingredient
  }
}
