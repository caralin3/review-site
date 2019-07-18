import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { Banner } from '../../src/client/react/components';

storiesOf('Components|Banner', module)
  .addDecorator(StoryRouter())
  .add('with text', () => (
    <Banner>
      <i className="fas fa-film banner__icon" />
      <h2>Welcome to Reviewer</h2>
    </Banner>
  ));
