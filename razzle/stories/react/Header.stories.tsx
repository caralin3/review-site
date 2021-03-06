import React from 'react';
import { storiesOf } from '@storybook/react';
import { Header } from '../../src/client/react/components';
import { admin1, user1 } from '../../src/client/mock';

storiesOf('Components|Header', module)
  .add('logged out', () => <Header />)
  .add('admin user logged in', () => <Header user={admin1} />)
  .add('general user logged in', () => <Header user={user1} />);
