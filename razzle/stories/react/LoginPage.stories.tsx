import React from 'react';
import { storiesOf } from '@storybook/react';
import { LoginPage } from '../../src/client/react/pages';

storiesOf('Pages|Login', module).add('with form', () => <LoginPage />);
