import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DisconnectedContentPage as ContentPage } from '../../src/client/react/pages';
import {
  content,
  episodes,
  movie1,
  reviews,
  routeProps,
  show1,
  user1
} from '../../src/client/mock';
import { routes } from '../../src/client/react/routes';

const props = {
  episodes,
  reviews,
  addRating: action('add rating'),
  addListRating: action('add rating'),
  content: undefined,
  contentError: undefined,
  contentLoading: false,
  contentList: content,
  contentListError: undefined,
  contentListLoading: false,
  contentListWatch: action('unwatch'),
  contentListUnwatch: action('unwatch'),
  createReview: action('delete review'),
  deleteReview: action('delete review'),
  loadContentList: action('load content list'),
  loadContent: action('load content'),
  loadEpisodes: action('load episodes'),
  loadReviews: action('load reviews'),
  reviewsError: undefined,
  reviewsLoading: false,
  updateRating: action('update rating'),
  updateListRating: action('update rating'),
  unwatch: action('unwatch'),
  user: user1,
  watch: action('watch')
};

storiesOf('Pages|ContentPage', module)
  .add('with all movies', () => (
    <ContentPage
      {...routeProps(routes.movie.path, { id: undefined })}
      {...props}
    />
  ))
  .add('with all tv shows', () => (
    <ContentPage
      {...routeProps(routes.show.path, { id: undefined })}
      {...props}
    />
  ))
  .add('with movie', () => (
    <ContentPage
      {...routeProps(routes.movie.path, { id: movie1.id })}
      {...props}
      content={movie1}
    />
  ))
  .add('with show', () => (
    <ContentPage
      {...routeProps(routes.show.path, { id: show1.id })}
      {...props}
      content={show1}
    />
  ));
