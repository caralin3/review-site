import React from 'react';
import { storiesOf } from '@storybook/react';
import { HomePage } from '../../src/client/react/pages';

storiesOf('Pages|Home', module).add('content', () => <HomePage />);
