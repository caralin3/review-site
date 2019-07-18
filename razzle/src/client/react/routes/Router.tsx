import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../pages';

export interface RouteMap {
  [route: string]: any;
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
  movie: {
    name: 'Movies',
    path: '/movie/:id?'
  },
  show: {
    name: 'TV Shows',
    path: '/show/:id?'
  },
  search: {
    name: 'Search',
    path: '/search'
  },
  editor: {
    name: 'New Item',
    path: '/editor'
  },
  profile: {
    name: 'Profile',
    path: '/profile/:username'
  },
  settings: {
    name: 'Settings',
    path: '/settings'
  }
};

export const routeMap: RouteMap = {
  [routes.home.path]: Home
};

export const Router = () => (
  <Switch>
    <Route
      exact={true}
      path={routes.home.path}
      component={routeMap[routes.home.path]}
    />
  </Switch>
);
