import React from 'react';
import { storiesOf } from '@storybook/react';
import { DisconnectedContentPage as ContentPage } from '../../src/client/react/pages';
import { content, movie1, routeProps, show1 } from '../../src/client/mock';
import { routes } from '../../src/client/react/routes';

storiesOf('Pages|ContentPage', module)
  .add('with all movies', () => (
    <ContentPage
      {...routeProps(routes.movie.path, { id: undefined })}
      allContent={content}
    />
  ))
  .add('with all tv shows', () => (
    <ContentPage
      {...routeProps(routes.show.path, { id: undefined })}
      allContent={content}
    />
  ))
  .add('with movie', () => (
    <ContentPage
      {...routeProps(routes.movie.path, { id: movie1.id })}
      allContent={content}
      currContent={movie1}
    />
  ))
  .add('with show', () => (
    <ContentPage
      {...routeProps(routes.show.path, { id: show1.id })}
      allContent={content}
      currContent={show1}
    />
  ));
