import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tab, TabList, TabPanel } from '../../src/client/react/components';

storiesOf('Components|Tabs', module).add('with panel', () => (
  <>
    <TabList>
      <Tab
        id="watch"
        panelId="watch-list"
        selected="watch"
        onClick={action('select tab watch')}
      >
        Watch List
      </Tab>
      <Tab
        id="global"
        panelId="global-Recent"
        selected="watch"
        onClick={action('select tab global')}
      >
        Recent
      </Tab>
    </TabList>
    <TabPanel selected="watch" id="watch-list" tabId="watch">
      <p>Review</p>
    </TabPanel>
    <TabPanel selected="watch" id="global-Recent" tabId="global">
      <p>Global Review</p>
    </TabPanel>
  </>
));
