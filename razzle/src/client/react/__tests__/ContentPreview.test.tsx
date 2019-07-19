import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ContentPreview } from '../components';
import { Content } from '../../../common';
import { movie1, show1 } from '../../mock';

const onRate = jest.fn();
const onWatch = jest.fn();

const component = (content: Content) => {
  return (
    <MemoryRouter>
      <ContentPreview content={content} onRate={onRate} onWatch={onWatch}>
        <div>Content</div>
      </ContentPreview>
    </MemoryRouter>
  );
};

describe('ContentPreview', () => {
  it('renders movie content correctly', () => {
    const output = renderer.create(component(movie1)).toJSON();

    expect(output).toMatchSnapshot();
  });

  it('renders series content correctly', () => {
    const output = renderer.create(component(show1)).toJSON();

    expect(output).toMatchSnapshot();
  });
});
