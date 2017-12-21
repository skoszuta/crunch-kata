import React from 'react';
import { connect } from 'react-redux';

import getNodeByPath from '../../utils/get-node-by-path';
import getVariableName from '../../utils/get-variable-name';

class VariableFinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: []
    };
  }

  onNodeSelectChange({ target: { value } }) {
    this.setState({
      path: [...this.state.path, value]
    });
  }

  onBackButtonClick() {
    this.setState({
      path: this.state.path.slice(0, -1)
    });
  }

  renderLastNode() {
    const { index, order } = this.props.variables;
    const lastNode = getNodeByPath(this.state.path, order);


    if (typeof lastNode === 'string') {
      return getVariableName(index[lastNode]);
    } else {
      const options = (typeof lastNode === 'object') ? Object.keys(lastNode) : lastNode.keys();
      const optionsDOM = options.map((option) => <option key={option}>{option}</option>);

      return (
        <span>
          <select onChange={this.onNodeSelectChange.bind(this)}>
            <option value={void 0}>Select an index...</option>
            {optionsDOM}
          </select>
        </span>
      )
    }
  }

  render() {
    const { index, order } = this.props.variables;
    const backButton = this.state.path.length ? <button onClick={this.onBackButtonClick.bind(this)}>Back</button> : '';

    return (
      <div>
        <div>
          Root -> {this.state.path.join(' -> ')} {this.state.path.length ? ' -> ' : ''}{this.renderLastNode()}{backButton}
        </div>
      </div>
    )
  }

  getVariableByPath(path) {
    const { index, order } = this.props.variables;
    return index[getNodeByPath(path, order)];
  }
}

function mapStateToProps({ variables }) {
  return { variables };
}

export default connect(mapStateToProps, null)(VariableFinder);
