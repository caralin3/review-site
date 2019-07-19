import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, SearchPage } from '../pages';

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
    path: '/movies'
  },
  show: {
    name: 'TV Shows',
    path: '/shows'
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
    path: '/profile'
  },
  settings: {
    name: 'Settings',
    path: '/settings'
  }
};

export const routeMap: RouteMap = {
  [routes.home.path]: HomePage,
  [routes.search.path]: SearchPage
};

export const Router = () => (
  <Switch>
    <Route
      exact={true}
      path={routes.home.path}
      component={routeMap[routes.home.path]}
    />
    <Route
      exact={true}
      path={routes.search.path}
      component={routeMap[routes.search.path]}
    />
  </Switch>
);
