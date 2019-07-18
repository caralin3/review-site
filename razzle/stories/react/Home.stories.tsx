import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { Home } from '../../src/client/react/pages';

storiesOf('Pages|Home', module)
  .addDecorator(StoryRouter())
  .add('content', () => <Home />);
