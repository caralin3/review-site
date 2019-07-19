import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Footer } from '../components';

describe('Footer', () => {
  it('renders correctly', () => {
    const output = renderer
      .create(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });
});
