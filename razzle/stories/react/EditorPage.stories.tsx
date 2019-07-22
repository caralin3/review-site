import React from 'react';
import { storiesOf } from '@storybook/react';
import { EditorPage } from '../../src/client/react/pages';

storiesOf('Pages|Editor', module).add('with form', () => <EditorPage />);
