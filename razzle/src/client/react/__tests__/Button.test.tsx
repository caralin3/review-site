import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../components';

configure({ adapter: new Adapter() });
const mockCallBack = jest.fn();

describe('Button', () => {
  it('renders correctly', () => {
    const output = renderer.create(<Button onClick={mockCallBack} />).toJSON();

    expect(output).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const output = renderer
      .create(<Button size="sm" variant="danger" fill onClick={mockCallBack} />)
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it('handles a click', () => {
    const wrapper = mount(<Button onClick={mockCallBack} />);
    const button = wrapper.find(Button).first();
    button.simulate('click');
    expect(mockCallBack).toBeCalledTimes(1);
  });
});
