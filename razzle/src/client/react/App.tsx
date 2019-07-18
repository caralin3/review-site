import React from 'react';
import { Switch } from 'react-router-dom';
import '../appearance/styles/index.scss';
import { Router } from './routes';

const App = () => (
  <Switch>
    <Router />
  </Switch>
);

export default App;
