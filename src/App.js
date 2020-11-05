import React, { useState, useEffect } from 'react';
import Grid1 from './components/Grid1'
import Grid2 from './components/Grid2'
import styled from 'styled-components';
import Player from './factories/Player'
import Gameboard from './factories/Gameboard'

const Container = styled.div`
display: flex;
justify-content: space-around;
`;

const App = () => {
  const [turn, setTurn] = useState(null)

  // let player1 = Player('Hu-Man', 'Human');
  // let player2 = Player('Robot', 'CPU');
  // let board1 = Gameboard();
  // let board2 = Gameboard();

  useEffect(() => {
    //this will need to happen after ship selection in the future
    setTurn(true)
  }, [])

  return (
    <div>
      <Container>
        <Grid1 turn={turn} setTurn={setTurn} />
        <Grid2 turn={turn} setTurn={setTurn} />
      </Container>
    </div>
  );
}

export default App;
