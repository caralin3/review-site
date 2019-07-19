import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Banner, SearchBar } from '../../src/client/react/components';

storiesOf('Components|Banner', module)
  .add('with text', () => (
    <Banner>
      <i className="fas fa-film banner__icon" />
      <h1 className="banner__brand">reviewer</h1>
      <p className="banner__text">Review your favorite movies and tv shows.</p>
    </Banner>
  ))
  .add('with search', () => (
    <Banner>
      <i className="fas fa-film banner__icon" />
      <h1 className="banner__brand">reviewer</h1>
      <p className="banner__text">
        Review your favorite movies and tv shows. Start looking for movies and
        shows below.
      </p>
      <SearchBar
        onChange={action('changed query')}
        onSearch={action('search submitted')}
        query=""
      />
    </Banner>
  ));
