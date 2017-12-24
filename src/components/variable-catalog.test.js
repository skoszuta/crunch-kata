import fs from 'fs';
import React from 'react';
import { mount, render } from 'enzyme';
import 'jest-styled-components';

import VariableCatalog from './variable-catalog';

const { index } = JSON.parse(fs.readFileSync('json/variables.json', 'utf8'));
const { graph: order } = JSON.parse(fs.readFileSync('json/order.json', 'utf8'));

describe('VariableCatalog', () => {
  const variables = { index, order };

  describe('snapshot', () => {
    it('should render correctly', () => {
      const wrapper = render(
        <VariableCatalog variables={variables} />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <VariableCatalog variables={variables} />
      );
    });

    it('should render all sub-trees initially collapsed', () => {
      const subTrees = wrapper.find('SubTree');

      subTrees.forEach(subTree => expect(subTree).toHaveStyleRule('display', 'none'));
    });

    // Below tests disabled due to enzyme wrapper not being updated after calling simulate()
    // See: https://github.com/airbnb/enzyme/issues/1400
    //
    // Below tests reference the .test-category-wrapper class which should be removed as soon as
    // https://github.com/airbnb/enzyme/issues/410 gets resolved
    //
    // it('should uncollapse a category sub-tree on click', () => {
    //   const categoryWrapper = wrapper.find('.test-category-wrapper').at(0);
    //   const button = categoryWrapper.find('Category').at(0);
    //   const subtree = categoryWrapper.find('SubTree').at(0);
    //
    //   button.simulate('click');
    //
    //   expect(subtree).not.toHaveStyleRule('display', 'none');
    // });
    //
    // it('should collapse a category sub-tree on click', () => {
    //   const categoryWrapper = wrapper.find('.test-category-wrapper').at(0);
    //   const button = categoryWrapper.find('Category').at(0);
    //   const subtree = categoryWrapper.find('SubTree').at(0);
    //
    //   button.simulate('click');
    //   button.simulate('click');
    //
    //   expect(subtree).toHaveStyleRule('display', 'none');
    // });
  });
});
