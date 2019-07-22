import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ContentPreviewList } from '../../src/client/react/components';
import { content } from '../../src/client/mock';

storiesOf('Components|ContentPreviewList', module).add(
  'with all content',
  () => (
    <ContentPreviewList
      contentList={content.content}
      handleRating={action('rate')}
      handleWatch={action('watch')}
    />
  )
);
