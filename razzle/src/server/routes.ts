import { Application, RequestHandler } from 'express';
import * as auth from './auth';
import * as endpoints from './endpoints';

const base_url = '/api/v1';

export interface RouteDictionary {
  [route: string]: {
    endpoint: RequestHandler;
    auth?: 'required' | 'optional';
  };
}

export const routes = {
  content: `${base_url}/content`,
  contentItem: `${base_url}/content/:id`,
  episodes: `${base_url}/content/:id/episodes`,
  episode: `${base_url}/content/:id/episodes/:episodeId`,
  review: `${base_url}/content/:id/reviews/:reviewId`,
  reviews: `${base_url}/content/:id/reviews`,
  rating: `${base_url}/content/:id/rating`,
  watchlist: `${base_url}/content/:id/watchlist`,
  login: `${base_url}/users/login`,
  profile: `${base_url}/user/profile/:username`,
  registration: `${base_url}/users`,
  user: `${base_url}/user`
};

export const getRoutes: RouteDictionary = {
  [routes.content]: {
    endpoint: endpoints.getContent,
    auth: 'optional'
  },
  [routes.contentItem]: {
    endpoint: endpoints.getContentItem,
    auth: 'optional'
  },
  [routes.episodes]: {
    endpoint: endpoints.getEpisodesBySeason,
    auth: 'optional'
  },
  [routes.episode]: {
    endpoint: endpoints.getEpisode,
    auth: 'optional'
  },
  [routes.profile]: {
    endpoint: endpoints.getUserProfile,
    auth: 'optional'
  },
  [routes.reviews]: {
    endpoint: endpoints.getReviews,
    auth: 'optional'
  },
  [routes.review]: {
    endpoint: endpoints.getReview,
    auth: 'optional'
  },
  [routes.user]: {
    endpoint: endpoints.getCurrentUser,
    auth: 'required'
  }
};

export const postRoutes: RouteDictionary = {
  [routes.content]: {
    endpoint: endpoints.createContent,
    auth: 'required'
  },
  [routes.episodes]: {
    endpoint: endpoints.createEpisode,
    auth: 'required'
  },
  [routes.login]: {
    endpoint: endpoints.login
  },
  [routes.registration]: {
    endpoint: endpoints.createUser
  },
  [routes.reviews]: {
    endpoint: endpoints.createReview,
    auth: 'required'
  },
  [routes.rating]: {
    endpoint: endpoints.addRating,
    auth: 'required'
  },
  [routes.watchlist]: {
    endpoint: endpoints.addToWatchList,
    auth: 'required'
  }
};

export const putRoutes: RouteDictionary = {
  [routes.contentItem]: {
    endpoint: endpoints.updateContent,
    auth: 'required'
  },
  [routes.episode]: {
    endpoint: endpoints.updateEpisode,
    auth: 'required'
  },
  [routes.rating]: {
    endpoint: endpoints.updateRating,
    auth: 'required'
  },
  [routes.review]: {
    endpoint: endpoints.updateReview,
    auth: 'required'
  },
  [routes.user]: {
    endpoint: endpoints.updateCurrentUser,
    auth: 'required'
  }
};

export const deleteRoutes: RouteDictionary = {
  [routes.contentItem]: {
    endpoint: endpoints.deleteContent,
    auth: 'required'
  },
  [routes.episode]: {
    endpoint: endpoints.deleteEpisode,
    auth: 'required'
  },
  [routes.review]: {
    endpoint: endpoints.deleteReview,
    auth: 'required'
  },
  [routes.watchlist]: {
    endpoint: endpoints.deleteFromWatchList,
    auth: 'required'
  }
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
