import { 
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REPLACE_INGREDIENT,
  RESET_STATE
} from './constants';
import { TIngredient } from '../../utils/types';

interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  index: number;
  item: TIngredient;
  optional: TIngredient[];
}
  
interface IAddItemAction {
  readonly type: typeof ADD_INGREDIENT;
  index: number;
  item: TIngredient;
  optional: TIngredient[];
}
  
interface IDeleteItemAction {
  readonly type: typeof DELETE_INGREDIENT;
  index: number;
  item: TIngredient;
  optional: TIngredient[];
}

interface IMoveIngredientAction {
  readonly type: typeof REPLACE_INGREDIENT;
  item: TIngredient;
  index: number;
  optional: TIngredient[];
}

interface IResetConstructorAction {
  readonly type: typeof RESET_STATE;
  item: TIngredient;
  index: number;
  optional: TIngredient[];
}

export type TBurgerConstructorActions =
  | IAddBunAction
  | IAddItemAction
  | IDeleteItemAction
  | IMoveIngredientAction
  | IResetConstructorAction;
