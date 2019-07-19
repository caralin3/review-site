import React from 'react';
import { storiesOf } from '@storybook/react';
import { DisconnectedContentPage as ContentPage } from '../../src/client/react/pages';
import { movie1, routeProps, show1 } from '../../src/client/mock';
import { routes } from '../../src/client/react/routes';

storiesOf('Pages|ContentPage', module)
  .add('with movie', () => (
    <ContentPage
      {...routeProps(routes.movie.path, { id: movie1.id })}
      content={movie1}
    />
  ))
  .add('with show', () => (
    <ContentPage
      {...routeProps(routes.show.path, { id: show1.id })}
      content={show1}
    />
  ));
