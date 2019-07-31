import { applyMiddleware, createStore, compose, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import config from '../../config';
import * as content from './content';
import * as contentItem from './contentItem';
import * as episode from './episode';
import * as episodes from './episodes';
import * as profile from './profile';
import * as reviews from './reviews';
import * as user from './user';
import { ApplicationState } from '.';

export default (): Store<ApplicationState> => {
  const composeEnhancers =
    config.env === 'development' && typeof window !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools
      : compose;

  const middleware = composeEnhancers(applyMiddleware(thunk));

  const persistConfig = {
    storage,
    key: 'primary'
  };

  const rootReducer = persistCombineReducers<ApplicationState>(persistConfig, {
    Content: content.reducer,
    ContentItem: contentItem.reducer,
    Episode: episode.reducer,
    Episodes: episodes.reducer,
    Profile: profile.reducer,
    Reviews: reviews.reducer,
    User: user.reducer
  });

  return createStore(rootReducer, undefined, middleware);
};
