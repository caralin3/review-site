import React from 'react';
import { storiesOf } from '@storybook/react';
import { RegisterPage } from '../../src/client/react/pages';

storiesOf('Pages|Register', module).add('with form', () => <RegisterPage />);
