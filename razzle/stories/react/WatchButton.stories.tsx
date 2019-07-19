import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { WatchButton } from '../../src/client/react/components';

storiesOf('Components|WatchButton', module)
  .add('watching', () => (
    <WatchButton watching={true} onClick={action('unwatch')} />
  ))
  .add('not watching', () => (
    <WatchButton watching={false} onClick={action('watch')} />
  ));
