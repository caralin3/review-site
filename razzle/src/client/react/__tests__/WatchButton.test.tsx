import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import { Button, WatchButton, WatchButtonProps } from '../components';

configure({ adapter: new Adapter() });
const mockCallBack = jest.fn();

const props: WatchButtonProps = {
  watching: false,
  onClick: mockCallBack
};

describe('WatchButton', () => {
  it('renders correctly', () => {
    const output = renderer.create(<WatchButton {...props} />).toJSON();

    expect(output).toMatchSnapshot();
  });

  it('handles a click', () => {
    const wrapper = mount(<WatchButton {...props} />);
    const button = wrapper.find(Button).first();
    button.simulate('click');
    expect(mockCallBack).toBeCalledTimes(1);
  });
});
