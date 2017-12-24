import React from 'react';
import { render } from 'enzyme';
import 'jest-styled-components';

import Chip from './chip';

describe('Chip', () => {
  const exampleContent = 'Example content';

  it('should render correctly', () => {
    const wrapper = render(
      <Chip>{exampleContent}</Chip>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render an arrow when requested', () => {
    const wrapper = render(
      <Chip arrow>{exampleContent}</Chip>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
