import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '../../src/client/appearance/styles/index.scss';

// automatically import all files ending in *.stories.tsx
const req = require.context('../../stories/react', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withA11y);
addParameters({ viewport: { viewports: INITIAL_VIEWPORTS } });

configure(loadStories, module);
