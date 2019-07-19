import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ContentPreview } from '../../src/client/react/components';
import { movie1, show1 } from '../../src/client/mock/content';

storiesOf('Components|ContentPreview', module)
  .add('with movie', () => (
    <ContentPreview
      {...movie1}
      onRate={action('rate')}
      onWatch={action('watch')}
    />
  ))
  .add('with tv show', () => (
    <ContentPreview
      {...show1}
      onRate={action('rate')}
      onWatch={action('unwatch')}
      year={`${show1.year}-${show1.endYear ? show1.endYear : ''}`}
    />
  ));
