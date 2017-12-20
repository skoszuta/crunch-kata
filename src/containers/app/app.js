import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchVariablesWithOrder } from '../../actions/variables-actions';
import VariableCatalog from '../../components/variable-catalog/variable-catalog';
import VariablePositionFinder from '../variable-position-finder/variable-position-finder';

const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  font-family: Helvetica, Arial, sans-serif;
  
  @media (min-width: 600px) {
    width: 60%;
  }
  
  @media (min-width: 960px) {
    width: 40%;
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
        <section>
          <h1>The component</h1>
          <VariableCatalog variables={this.props.variables}/>
        </section>
        <section>
          <h1>Variable position finder</h1>
          <VariablePositionFinder/>
        </section>
        <section>
          <h1>Variable finder</h1>
        </section>
      </ContentWrapper>
    );
  }
}

function mapStateToProps({ variables }) {
  return { variables };
}

export default connect(mapStateToProps, { fetchVariablesWithOrder })(App);
