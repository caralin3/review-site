import React from 'react';
import { Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import '../appearance/styles/index.scss';
import { Layout } from './components';
import { Router } from './routes';
import { ApplicationState, createStore } from './store';

const App = () => {
  const store: Store<ApplicationState> = createStore();
  return (
    <Provider store={store}>
      <Layout>
        <Switch>
          <PersistGate persistor={persistStore(store)}>
            <Router />
          </PersistGate>
        </Switch>
      </Layout>
    </Provider>
  );
};

export default App;
