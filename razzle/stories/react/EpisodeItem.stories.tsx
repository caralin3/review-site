import React from 'react';
import { storiesOf } from '@storybook/react';
import { EpisodeItem } from '../../src/client/react/components';
import { episode1 } from '../../src/client/mock';

storiesOf('Components|EpisodeItem', module).add('with episode', () => (
  <EpisodeItem episode={episode1} />
));
