import { Application, RequestHandler } from 'express';
import * as auth from './auth';
import * as endpoints from './endpoints';

export interface RouteDictionary {
  [route: string]: {
    endpoint: RequestHandler;
    auth?: 'required' | 'optional';
  };
}

export const routes = {
  content: '/api/v1/content',
  contentItem: '/api/v1/contentItem/:id',
  review: '/api/v1/contentItem/:id/review/:id',
  reviews: '/api/v1/contentItem/:id/reviews',
  rating: '/api/v1/contentItem/:id/rating',
  watchlist: '/api/v1/profiles/:username/watchlist',
  login: '/api/v1/users/login',
  profile: '/api/v1/profiles/:username',
  registration: '/api/v1/users',
  user: '/api/v1/user'
};

export const getRoutes: RouteDictionary = {
  // [routes.content]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'optional'
  // },
  // [routes.contentItem]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'optional'
  // },
  // [routes.reviews]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'optional'
  // },
  [routes.user]: {
    endpoint: endpoints.getCurrentUser,
    auth: 'required'
  }
};

export const postRoutes: RouteDictionary = {
  // [routes.content]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'required'
  // },
  [routes.login]: {
    endpoint: endpoints.login
  },
  [routes.registration]: {
    endpoint: endpoints.createUser
  }
  // [routes.reviews]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'required'
  // },
  // [routes.rating]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'required'
  // },
  // [routes.watchlist]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'required'
  // }
};

export const putRoutes: RouteDictionary = {
  // [routes.contentItem]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'required'
  // },
  // [routes.rating]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'required'
  // },
  // [routes.review]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'required'
  // },
  [routes.user]: {
    endpoint: endpoints.updateCurrentUser,
    auth: 'required'
  }
};

export const deleteRoutes: RouteDictionary = {
  // [routes.contentItem]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'required'
  // },
  // [routes.review]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'required'
  // },
  // [routes.watchlist]: {
  //   endpoint: endpoints.getCurrentUser,
  //   auth: 'required'
  // }
};

export function createRoutes(server: Application) {
  Object.keys(getRoutes).forEach(key => {
    if (getRoutes[key].auth === 'required') {
      server.get(key, auth.requiredMiddleware, getRoutes[key].endpoint);
    } else if (getRoutes[key].auth === 'optional') {
      server.get(key, auth.optionalMiddleware, getRoutes[key].endpoint);
    } else {
      server.get(key, getRoutes[key].endpoint);
    }
  });
  Object.keys(postRoutes).forEach(key => {
    if (postRoutes[key].auth === 'required') {
      server.post(key, auth.requiredMiddleware, postRoutes[key].endpoint);
    } else if (postRoutes[key].auth === 'optional') {
      server.post(key, auth.optionalMiddleware, postRoutes[key].endpoint);
    } else {
      server.post(key, postRoutes[key].endpoint);
    }
  });
  Object.keys(putRoutes).forEach(key => {
    if (putRoutes[key].auth === 'required') {
      server.put(key, auth.requiredMiddleware, putRoutes[key].endpoint);
    } else if (putRoutes[key].auth === 'optional') {
      server.put(key, auth.optionalMiddleware, putRoutes[key].endpoint);
    } else {
      server.put(key, putRoutes[key].endpoint);
    }
  });
  Object.keys(deleteRoutes).forEach(key => {
    if (deleteRoutes[key].auth === 'required') {
      server.delete(key, auth.requiredMiddleware, deleteRoutes[key].endpoint);
    } else if (deleteRoutes[key].auth === 'optional') {
      server.delete(key, auth.optionalMiddleware, deleteRoutes[key].endpoint);
    } else {
      server.delete(key, deleteRoutes[key].endpoint);
    }
  });
}
