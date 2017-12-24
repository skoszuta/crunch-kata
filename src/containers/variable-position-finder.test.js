import fs from 'fs';
import React from 'react';
import { mount, render } from 'enzyme';
import 'jest-styled-components';

import { VariablePositionFinder } from './variable-position-finder';

const { index } = JSON.parse(fs.readFileSync('json/variables.json', 'utf8'));
const { graph: order } = JSON.parse(fs.readFileSync('json/order.json', 'utf8'));

describe('VariablePositionFinder', () => {
  const variables = { index, order };

  describe('snapshot', () => {
    it('should render correctly', () => {
      const wrapper = render(
        <VariablePositionFinder variables={variables} />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <VariablePositionFinder variables={variables} />
      );
    });

    it('should show a (correct) path', () => {
      expect(wrapper.find('li').length).toBe(0);

      wrapper.find('select').prop('onChange')({ target: { value: 'ede6a8' } });
      wrapper.update();

      expect(wrapper.find('li').length).toBe(7);
    });
  });
});
