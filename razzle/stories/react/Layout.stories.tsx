import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { DisconnectedLayout as Layout } from '../../src/client/react/components';
import { admin1, user1 } from '../../src/client/mock';

storiesOf('Layout', module)
  .addDecorator(StoryRouter())
  .add('logged out', () => (
    <Layout>
      <div>Content</div>
    </Layout>
  ))
  .add('admin user logged in', () => (
    <Layout user={admin1}>
      <div>Content</div>
    </Layout>
  ))
  .add('general user logged in', () => (
    <Layout user={user1}>
      <div>Content</div>
    </Layout>
  ));
