import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import getVariableName from 'utils/get-variable-name';
import getVariablePath from 'utils/get-variable-path';
import Chip, { ChipsList } from 'components/chip';

const BreadcrumbsWrapper = styled.div`
  margin-top: 1rem;
`;

class VariablePositionFinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedVariable: void 0,
      breadcrumbs: []
    };
  }

  onSelectChange({ target: { value }}) {
    const { order } = this.props.variables;

    this.setState({
      selectedVariable: value,
      breadcrumbs: getVariablePath(value, this.props.variables.order)
    });
  }

  renderBreadcrumbs() {
    if (this.state.selectedVariable && !this.state.breadcrumbs) {
      return (
        <div>Variable was not found in the tree.</div>
      );
    } else if (!this.state.selectedVariable) {
      return '';
    }

    const { index } = this.props.variables;

    const breadcrumbs = [
      'Root',
      ...this.state.breadcrumbs,
      getVariableName(index[this.state.selectedVariable])
    ].map((crumb, index, array) => <Chip arrow={index < array.length - 1} key={index}>{crumb}</Chip>);

    return (
      <ChipsList>{breadcrumbs}</ChipsList>
    );
  }

  render() {
    const options = _.map(this.props.variables.index, (variable, key) => (
      <option value={key} key={key}>{getVariableName(variable, key)}</option>
    ));

    if (this.state.selectedVariable === void 0) {
      options.unshift(<option value={void 0} key="placeholder">Select a variable to see its position...</option>);
    }

    return (
      <div>
        <select
          value={this.state.selectedVariable}
          onChange={this.onSelectChange.bind(this)}>
          {options}
        </select>
        <BreadcrumbsWrapper>{this.renderBreadcrumbs()}</BreadcrumbsWrapper>
      </div>
    );
  }
}

function mapStateToProps({ variables }) {
  return { variables };
}

export default connect(mapStateToProps, null)(VariablePositionFinder);
