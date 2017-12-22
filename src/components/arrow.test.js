import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Arrow from './arrow';

describe('Arrow', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Arrow/>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
