import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { Footer } from '../../src/client/react/components';

storiesOf('Components|Footer', module)
  .addDecorator(StoryRouter())
  .add('with text', () => <Footer />);
