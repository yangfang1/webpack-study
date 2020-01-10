import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './modules';
import clientMiddleware from './middleware';

const configureStore = function configureStore(preloadedState) {//初始satate
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(clientMiddleware, thunk, logger),
  );
};
export default configureStore;
