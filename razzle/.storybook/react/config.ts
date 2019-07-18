import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import '../../src/client/appearance/styles/index.scss';

// automatically import all files ending in *.stories.tsx
const req = require.context('../../stories/react', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withA11y);

configure(loadStories, module);
