import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchVariablesWithOrder } from '../../actions/variables-actions';
import VariableCatalog from '../../components/variable-catalog/variable-catalog';
import VariablePositionFinder from '../variable-position-finder/variable-position-finder';
import VariableFinder from '../variable-finder/variable-finder';

const ContentWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  
  @media (min-width: 600px) {
    padding: 2rem;
  }
`;

const Heading = styled.h1`
  margin: 0 0 1rem 0;
`;

const Section = styled.section`
  margin-top: 2rem;
  
  &:first-child {
    margin-top: 0;
  }
`;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchVariablesWithOrder();
  }

  render() {
    if (this.props.variables === null) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <ContentWrapper>
        <Section>
          <Heading>The component</Heading>
          <VariableCatalog variables={this.props.variables}/>
        </Section>
        <Section>
          <Heading>Variable position finder</Heading>
          <VariablePositionFinder/>
        </Section>
        <Section>
          <Heading>Variable finder</Heading>
          <VariableFinder/>
        </Section>
      </ContentWrapper>
    );
  }
}

function mapStateToProps({ variables }) {
  return { variables };
}

export default connect(mapStateToProps, { fetchVariablesWithOrder })(App);
