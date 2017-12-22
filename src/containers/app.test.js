import React from 'react';
import { shallow } from 'enzyme';

import { App } from './app';

describe('App', () => {
  const fetchVariablesWithOrder = jest.fn();
  const variablesLoaded = { index: {}, order: [] };

  afterEach(() => {
    fetchVariablesWithOrder.mockReset();
  });

  it('should render a loading indicator', () => {
    const wrapper = shallow(
      <App variables={null} fetchVariablesWithOrder={fetchVariablesWithOrder}/>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with variables loaded', () => {
    const wrapper = shallow(
      <App variables={variablesLoaded} fetchVariablesWithOrder={fetchVariablesWithOrder}/>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch fetchVariablesWithOrder on mount', () => {
    const wrapper = shallow(
      <App variables={null} fetchVariablesWithOrder={fetchVariablesWithOrder}/>
    );

    expect(fetchVariablesWithOrder).toBeCalled();
  });
});
