import React from 'react';
import renderer from 'react-test-renderer';
import { Banner } from '../components';

describe('Banner', () => {
  it('renders correctly', () => {
    const output = renderer
      .create(
        <Banner>
          <p>More content</p>
        </Banner>
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });
});
