import React from 'react';
import styled from 'styled-components';

import getVariableName from '../../utils/get-variable-name';

import arrowRightIcon from './arrow-right-icon.svg';
import graphIcon from './graph-icon.svg';

const ListContainer = styled.ul`
  max-width: 300px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 1rem;
  list-style-type: none;
  font-size: 0.85rem;
  overflow: hidden;
`;

const SubTree = styled.ul`
  list-style-type: none;
  padding-left: 0;
  overflow: hidden;
  height: ${(props) => props.collapsed ? 0 : 'auto'};
`;

const ListItem = styled.li`
  
`;

const Button = styled.button`
  display: flex;
  
  width: 100%;
  outline: none;
  border: 0;
  padding-top: 0.5rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  padding-left: ${props => props.depth + 1}rem;
  
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  
  color: #333333;
  text-align: left;
  
  background-color: transparent;
  cursor: pointer;
  
  transition: all 0.3s ease;
  
  &:hover {
    color: #3A9FC2;
  }
`;

const Category = Button.extend`
  &:before {
    content: '';
    width: 24px;
    height: 24px;
    flex: 0 0 auto;
    margin-right: 0.5rem;
    background-image: url(${arrowRightIcon});
    
    transform: rotate(${(props) => props.collapsed ? 0 : 90}deg);
    transition: all 0.3s ease;
  }
`;

const Variable = Button.extend`
  &:before {
    content: '';
    width: 24px;
    height: 24px;
    flex: 0 0 auto;
    margin-right: 0.5rem;
    background-image: url(${graphIcon});
  }
`;

export default class VariableCatalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: new Map()
    };
  }

  onCategoryClick(node) {
    const isCollapsed = new Map(this.state.isCollapsed);
    isCollapsed.set(node, !this.isCollapsed(node));
    this.setState({ isCollapsed });
  }

  render() {
    const { order } = this.props.variables;

    return (
      <ListContainer>
        {this.renderTree(order)}
      </ListContainer>
    );
  }

  renderTree(tree, depth = 0) {
    const { index } = this.props.variables;

    return tree.map((node) => {
      if (typeof node === 'string') {
        return (
          <ListItem key={node}>
            <Variable depth={depth}>{getVariableName(index[node])}</Variable>
          </ListItem>
        );
      } else if (typeof node === 'object') {
        const [nodeName] = Object.keys(node);

        return (
          <ListItem key={nodeName}>
            <Category depth={depth} collapsed={this.isCollapsed(node)} onClick={this.onCategoryClick.bind(this, node)}>
              {nodeName}
            </Category>
            <SubTree collapsed={this.isCollapsed(node)}>
              {this.renderTree(node[nodeName], depth + 1)}
            </SubTree>
          </ListItem>
        );
      } else {
        throw new Error('Incorrect data structure provided.');
      }
    });
  }

  isCollapsed(node) {
    return this.state.isCollapsed.has(node) ? this.state.isCollapsed.get(node) : true;
  }
}
