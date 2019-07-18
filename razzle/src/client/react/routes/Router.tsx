import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
// import {
//   HomePage
// } from '../pages';

export interface RouteMap {
  [route: string]: React.ComponentClass<any, any>;
}

export const routes = {
  home: {
    name: 'Home',
    path: '/'
  },
  login: {
    name: 'Login',
    path: '/login'
  },
  register: {
    name: 'Sign Up',
    path: '/register'
  },
  editor: {
    name: 'New Item',
    path: '/editor'
  },
  profile: {
    name: 'Profile',
    path: '/profile/:username?'
  },
  settings: {
    name: 'Settings',
    path: '/settings'
  }
};

export const routeMap: RouteMap = {
  // [routes.home]: HomePage,
};

export const Router = (
  <Switch>
    {/* <Route exact={true} path={routes.home} component={routeMap[routes.home]} /> */}
  </Switch>
);
