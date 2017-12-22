import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import getNodeByPath from 'utils/get-node-by-path';
import getVariableName from 'utils/get-variable-name';
import Chip, { ChipsList } from 'components/chip';

import backspaceIcon from 'images/backspace-icon.svg';

const LastNode = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;

  margin-top: 0.5rem;
`;

const BackspaceButton = styled.button`
  margin-left: 0.5rem;
  outline: none;
  width: 24px;
  height: 24px;
  border: 0;
  background-color: transparent;
  background-image: url(${backspaceIcon});
  cursor: pointer;
`;

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

  onBackspaceClick() {
    this.setState({
      path: this.state.path.slice(0, -1)
    });
  }

  renderLastNode() {
    const { index, order } = this.props.variables;
    const lastNode = getNodeByPath(this.state.path, order);
    const backspace = this.state.path.length ? <BackspaceButton onClick={this.onBackspaceClick.bind(this)}/> : '';

    if (typeof lastNode === 'string') {
      return [
        <Chip key="chip">{getVariableName(index[lastNode])}</Chip>,
        <LastNode key="backspace">{backspace}</LastNode>
      ];
    } else {
      const options = (typeof lastNode === 'object') ? Object.keys(lastNode) : lastNode.keys();
      const optionsDOM = options.map((option) => <option key={option}>{option}</option>);

      return (
        <LastNode>
          <select onChange={this.onNodeSelectChange.bind(this)}>
            <option value={void 0}>Select a key...</option>
            {optionsDOM}
          </select>
          {backspace}
        </LastNode>
      )
    }
  }

  renderPath() {
    return ['Root', ...this.state.path].map((segment, index) => (
      <Chip arrow={true} key={index}>{segment}</Chip>
    ));
  }

  render() {
    const { index, order } = this.props.variables;

    return (
      <div>
        <ChipsList>
          {this.renderPath()}
          {this.renderLastNode()}
        </ChipsList>
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
