import React from 'react';
import { storiesOf } from '@storybook/react';
import { Review } from '../../src/client/react/components';

storiesOf('Components|Review', module).add('with text', () => <Review />);
