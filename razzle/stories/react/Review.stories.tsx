import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Review } from '../../src/client/react/components';
import { profile1, profile2, reviewMovie1, user1 } from '../../src/client/mock';

storiesOf('Components|Review', module)
  .add('with other user', () => (
    <Review
      date={reviewMovie1.created}
      onDelete={action('cannot delete review')}
      rating={4}
      review={reviewMovie1.body}
      user={user1}
      username={profile2.username}
    />
  ))
  .add('with current user', () => (
    <Review
      date={reviewMovie1.created}
      onDelete={action('delete review')}
      rating={4}
      review={reviewMovie1.body}
      user={user1}
      username={profile1.username}
    />
  ));
