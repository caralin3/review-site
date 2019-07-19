import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { MemoryRouter, NavLink } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { User } from '../../../common';
import { admin1, user1 } from '../../mock';
import { Header } from '../components';

configure({ adapter: new Adapter() });

const component = (user?: User) => (
  <MemoryRouter>
    <Header user={user} />
  </MemoryRouter>
);

describe('Header', () => {
  it('renders logged out links correctly', () => {
    const output = renderer.create(component()).toJSON();

    expect(output).toMatchSnapshot();
  });

  it('renders logged in links correctly', () => {
    const output = renderer.create(component(user1)).toJSON();

    expect(output).toMatchSnapshot();
  });

  it('renders admin links correctly', () => {
    const output = renderer.create(component(admin1)).toJSON();

    expect(output).toMatchSnapshot();
  });

  it('has correct navigation links', () => {
    const wrapper = mount(component());
    const authWrapper = mount(component(user1));
    const adminWrapper = mount(component(admin1));
    const links = wrapper.find(NavLink);
    const authLinks = authWrapper.find(NavLink);
    const adminLinks = adminWrapper.find(NavLink);
    expect(links.length).toEqual(7);
    expect(authLinks.length).toEqual(11);
    expect(adminLinks.length).toEqual(13);
  });
});
