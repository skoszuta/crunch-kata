import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import getVariableName from '../../utils/get-variable-name';

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
      selectedVariable: value
    });

    this.performSearch(value);
  }

  render() {
    const options = _.map(this.props.variables.index, (variable, key) => (
      <option value={key} key={key}>{getVariableName(variable, key)}</option>
    ));

    const breadcrumbs = this.state.breadcrumbs.join(' -> ');

    return (
      <div>
        <select
          value={this.state.selectedVariable}
          onChange={this.onSelectChange.bind(this)}>
          {options}
        </select>
        <div>{breadcrumbs}</div>
      </div>
    );
  }

  performSearch(key, tree = this.props.variables.order, breadcrumbs = ['Root']) {
    return tree.some((node) => {
      if (typeof node !== 'string') {
        const nodeName = Object.keys(node)[0];
        return this.performSearch(key, node[nodeName], [...breadcrumbs, nodeName]);
      } else if (node === key) {
        this.setState({
          breadcrumbs: [
            ...breadcrumbs,
            getVariableName(this.props.variables.index[node])
          ]
        });
        return true;
      } else {
        return false;
      }
    });
  }
}

function mapStateToProps({ variables }) {
  return { variables };
}

export default connect(mapStateToProps, null)(VariablePositionFinder);
