import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { store } from '../store';
import { TRootState } from '../services/reducers/root-reducer';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TAppActions } from '../utils/types';

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TAppActions>
>;
