import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';

import { appReducer } from './appReducer';
import errorReducer from '../components/ErrorRetry/reducer';
import homeReducer from '../components/Home/reducer';
import detailReducer from '../components/PokemonDetail/reducer';
import { augmentorMiddleware } from './storeMiddleware';

// if you're also using redux-thunk, add it as a middleware
const createStoreWithMiddleware = compose(
  applyMiddleware(augmentorMiddleware(), ReduxThunk)
)(createStore);

const rootReducer = combineReducers({
  app: appReducer,
  errorReducer,
  homeReducer,
  detailReducer
});

export default function configureStore(initialState = {}) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
