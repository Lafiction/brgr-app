import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { store } from '../store';
import { TRootState } from '../services/reducers/root-reducer';



export type AppDispatch = typeof store.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

