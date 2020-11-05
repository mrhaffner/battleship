import React from 'react';
import Grid from './components/Grid'
import styled from 'styled-components';

const App = () => {

  const Container = styled.div`
    display: flex;
    justify-content: space-around;
  `;

  return (
    <Container>
      <Grid />
      <Grid />
    </Container>
  );
}

export default App;
