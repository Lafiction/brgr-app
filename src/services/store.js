import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers/root-reducer';
import { createSocketMiddleware } from './socketMiddleware';
import { wsActions } from './actions/websocket';

const WS_URL = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, createSocketMiddleware(WS_URL, wsActions))
);
export const store = createStore(rootReducer, enhancer);
