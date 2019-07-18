import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from '../../src/client/react/components';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('small, danger', () => <Button onClick={action('clicked')} size="sm" variant="danger">Small Button</Button>)
  .add('medium, primary', () => <Button onClick={action('clicked')} variant="primary">Medium Button</Button>)
  .add('large, success', () => <Button onClick={action('clicked')} size="lg" variant="success">Large Button</Button>);
