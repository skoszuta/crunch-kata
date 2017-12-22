import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Chip from './chip';

describe('Chip', () => {
  const exampleContent = 'Example content';

  it('should render correctly', () => {
    const wrapper = shallow(
      <Chip>{exampleContent}</Chip>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render an arrow when requested', () => {
    const wrapper = shallow(
      <Chip arrow={true}>{exampleContent}</Chip>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
