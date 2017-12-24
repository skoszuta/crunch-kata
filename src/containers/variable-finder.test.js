import fs from 'fs';
import React from 'react';
import { mount, render } from 'enzyme';
import 'jest-styled-components';

import { VariableFinder } from './variable-finder';

const { index } = JSON.parse(fs.readFileSync('json/variables.json', 'utf8'));
const { graph: order } = JSON.parse(fs.readFileSync('json/order.json', 'utf8'));

describe('VariableFinder', () => {
  const variables = { index, order };

  describe('snapshot', () => {
    it('should render correctly', () => {
      const wrapper = render(
        <VariableFinder variables={variables} />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    const validPathState = { path: [2, 'Demographics and Technographics', 3] };
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <VariableFinder variables={variables} />
      );
    });

    it('should add a segment on select change', () => {
      const select = wrapper.find('select').at(0);
      select.prop('onChange')({ target: { value: 0 } });
      wrapper.update();

      expect(wrapper.find('li').length).toBe(3);
    });

    it('should hide the select when a variable is reached', () => {
      wrapper.setState(validPathState);
      wrapper.update();

      expect(wrapper.find('select').length).toBe(0);
    });

    it('should show a delete button when the path is not empty', () => {
      expect(wrapper.find('button').length).toBe(0);

      wrapper.setState(validPathState);
      wrapper.update();

      expect(wrapper.find('button').length).toBe(1);
    });
  });
});
