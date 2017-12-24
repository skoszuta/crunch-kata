import React from 'react';
import { shallow, render } from 'enzyme';
import 'jest-styled-components';

import { App } from './app';

describe('App', () => {
  const fetchVariablesWithOrder = jest.fn();
  const variablesLoaded = { index: {}, order: [] };

  afterEach(() => {
    fetchVariablesWithOrder.mockReset();
  });

  it('should render a loading indicator', () => {
    const wrapper = render(
      <App variables={null} fetchVariablesWithOrder={fetchVariablesWithOrder} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with variables loaded', () => {
    const wrapper = shallow(
      <App variables={variablesLoaded} fetchVariablesWithOrder={fetchVariablesWithOrder} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch fetchVariablesWithOrder on mount', () => {
    shallow(
      <App variables={null} fetchVariablesWithOrder={fetchVariablesWithOrder} />
    );

    expect(fetchVariablesWithOrder).toBeCalled();
  });
});
