import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ContentPage,
  EditorPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  SearchPage
} from '../pages';

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
    name: 'Content Editor',
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
  [routes.login.path]: LoginPage,
  [routes.register.path]: RegisterPage,
  [routes.editor.path]: EditorPage,
  [routes.profile.path]: ProfilePage,
  [routes.search.path]: SearchPage,
  [routes.movie.path]: ContentPage,
  [routes.show.path]: ContentPage
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
      path={routes.login.path}
      component={routeMap[routes.login.path]}
    />
    <Route
      exact={true}
      path={routes.register.path}
      component={routeMap[routes.register.path]}
    />
    <Route
      exact={true}
      path={routes.search.path}
      component={routeMap[routes.search.path]}
    />
    <Route
      exact={true}
      path={`${routes.editor.path}/:id?`}
      component={routeMap[routes.editor.path]}
    />
    <Route
      exact={true}
      path={`${routes.profile.path}/:id`}
      component={routeMap[routes.profile.path]}
    />
    <Route
      exact={true}
      path={`${routes.movie.path}/:id?`}
      component={routeMap[routes.movie.path]}
    />
    <Route
      exact={true}
      path={`${routes.show.path}/:id?`}
      component={routeMap[routes.show.path]}
    />
  </Switch>
);
