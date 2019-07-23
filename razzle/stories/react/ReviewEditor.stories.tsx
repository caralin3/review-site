import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ReviewEditor } from '../../src/client/react/components';

storiesOf('Components|ReviewEditor', module)
  .add('with empty form', () => (
    <ReviewEditor
      errors={[]}
      loading={false}
      onChange={action('change text')}
      onRate={action('rate')}
      onSubmit={action('submit')}
      rating={0}
      review=""
      submit={false}
    />
  ))
  .add('with default text', () => (
    <ReviewEditor
      errors={[]}
      loading={false}
      onChange={action('change text')}
      onRate={action('rate')}
      onSubmit={action('submit')}
      rating={3}
      review="This a review"
      submit={false}
    />
  ))
  .add('with error', () => (
    <ReviewEditor
      errors={['Could not add review']}
      loading={false}
      onChange={action('change text')}
      onRate={action('rate')}
      onSubmit={action('submit')}
      rating={0}
      review=""
      submit={true}
    />
  ))
  .add('with loading', () => (
    <ReviewEditor
      errors={[]}
      loading={true}
      onChange={action('change text')}
      onRate={action('rate')}
      onSubmit={action('submit')}
      rating={0}
      review=""
      submit={false}
    />
  ));
