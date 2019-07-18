import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '../../src/client/react/components';

storiesOf('Button', module)
  .add('small', () => (
    <>
      <Button onClick={action('clicked primary')} size="sm" variant="primary">
        Primary
      </Button>
      <Button onClick={action('clicked danger')} size="sm" variant="danger">
        Danger
      </Button>
      <Button onClick={action('clicked success')} size="sm" variant="success">
        Success
      </Button>
    </>
  ))
  .add('medium', () => (
    <>
      <Button onClick={action('clicked primary')} variant="primary">
        Primary
      </Button>
      <Button onClick={action('clicked danger')} variant="danger">
        Danger
      </Button>
      <Button onClick={action('clicked success')} variant="success">
        Success
      </Button>
    </>
  ))
  .add('large', () => (
    <>
      <Button onClick={action('clicked primary')} size="lg" variant="primary">
        Primary
      </Button>
      <Button onClick={action('clicked danger')} size="lg" variant="danger">
        Danger
      </Button>
      <Button onClick={action('clicked success')} size="lg" variant="success">
        Success
      </Button>
    </>
  ));
