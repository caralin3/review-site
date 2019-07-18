import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import { SearchBar } from '../../src/client/react/components';

storiesOf('Components|SearchBar', module)
  .addDecorator(StoryRouter())
  .add('without query', () => (
    <SearchBar
      onChange={action('changed query')}
      onSearch={action('search submitted')}
      query=""
    />
  ))
  .add('with query', () => (
    <SearchBar
      onChange={action('changed query')}
      onSearch={action('search submitted')}
      query="movie"
    />
  ));
