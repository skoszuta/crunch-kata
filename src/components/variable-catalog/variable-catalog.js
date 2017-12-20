import React from 'react';
import styled from 'styled-components';

import getVariableName from '../../utils/get-variable-name';

const ListContainer = styled.ul`
  border: 1px solid #eee;
  max-width: 250px;
`;

const SubTree = styled.ul`
  padding-left: 1rem;
`;

const ListItem = styled.li`
  
`;

const Variable = styled.div`

`;

const Category = styled.button`
`;

export default function VariableCatalog({ variables: { index, order } }) {
  return (
    <ListContainer>
      {renderTree(order)}
    </ListContainer>
  );

  function renderTree(tree) {
    return tree.map((node) => {
      if (typeof node === 'string') {
        return (
          <ListItem key={node}>
            <Variable>{getVariableName(index[node])}</Variable>
          </ListItem>
        );
      } else if (typeof node === 'object') {
        const [nodeName] = Object.keys(node);

        return (
          <ListItem key={nodeName}>
            <Category>{nodeName}</Category>
            <SubTree>{renderTree(node[nodeName])}</SubTree>
          </ListItem>
        );
      } else {
        throw new Error('Incorrect data structure provided.');
      }
    });
  }
}
