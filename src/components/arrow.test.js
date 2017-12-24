import React from 'react';
import { render } from 'enzyme';
import 'jest-styled-components';

import Arrow from './arrow';

describe('Arrow', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Arrow />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
