import React from 'react';
import styled from 'styled-components';

import arrowRightIcon from 'images/arrow-right-icon.svg';

const ChipWrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  
  margin-top: 0.5rem;
`;

const ChipContent = styled.div`
  display: inline-block;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  
  font-size: 0.85rem;
  color: #f6f6f6;
  background-color: #666;
`;

const Arrow = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  
  flex: 0 0 auto;
  
  background-image: url(${arrowRightIcon});
`;

export const ChipsList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  
  margin: 0;
  padding: 0;
  
  list-style-type: none;
`;

export default function Chip(props) {
  const arrow = props.arrow ? <Arrow/> : '';

  return (
    <ChipWrapper>
      <ChipContent>{props.children}</ChipContent>
      {arrow}
    </ChipWrapper>
  );
}
