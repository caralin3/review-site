import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { User } from '../../../common';
import { user1 } from '../../mock';
import { DisconnectedLayout as Layout } from '../components';

const component = (user?: User) => {
  return (
    <MemoryRouter>
      <Layout user={user}>
        <div>Content</div>
      </Layout>
    </MemoryRouter>
  );
};

describe('Layout', () => {
  it('renders logged out state correctly', () => {
    const output = renderer.create(component()).toJSON();

    expect(output).toMatchSnapshot();
  });

  it('renders logged in state correctly', () => {
    const output = renderer.create(component(user1)).toJSON();

    expect(output).toMatchSnapshot();
  });
});
