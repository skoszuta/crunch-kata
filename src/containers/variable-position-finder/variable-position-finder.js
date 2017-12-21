import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import getVariableName from '../../utils/get-variable-name';
import getVariablePath from '../../utils/get-variable-path';

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

    return this.state.breadcrumbs
      .concat(getVariableName(index[this.state.selectedVariable]))
      .join(' -> ');
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
        <div>{this.renderBreadcrumbs()}</div>
      </div>
    );
  }
}

function mapStateToProps({ variables }) {
  return { variables };
}

export default connect(mapStateToProps, null)(VariablePositionFinder);
