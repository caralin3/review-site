import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StarRating } from '../../src/client/react/components';

storiesOf('Components|StarRating', module)
  .add('with 0 star', () => <StarRating rating={0} onClick={action('rate')} />)
  .add('with 1 star', () => <StarRating rating={1} onClick={action('rate')} />)
  .add('with 2 stars', () => <StarRating rating={2} onClick={action('rate')} />)
  .add('with 3 stars', () => <StarRating rating={3} onClick={action('rate')} />)
  .add('with 4 stars', () => <StarRating rating={4} onClick={action('rate')} />)
  .add('with 5 stars', () => <StarRating rating={5} onClick={action('rate')} />)
  .add('with my rating', () => (
    <StarRating rating={5} myRating={4} onClick={action('rate')} />
  ));
