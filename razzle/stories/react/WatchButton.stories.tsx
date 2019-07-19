import React from 'react';
import { storiesOf } from '@storybook/react';
import { WatchButton } from '../../src/client/react/components';
import { action } from '@storybook/addon-actions';

storiesOf('Components|WatchButton', module)
  .add('watching', () => (
    <WatchButton watching={true} onClick={action('unwatch')} />
  ))
  .add('not watching', () => (
    <WatchButton watching={false} onClick={action('watch')} />
  ));
