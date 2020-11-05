import React, { useState } from 'react';
import Grid from './components/Grid'
import styled from 'styled-components';
import Player from './factories/Player'
import Gameboard from './factories/Gameboard'

const App = () => {

  const [player1, setPlayer1] = useState(Player('Hu-Man', 'Human'));
  const [player2, setPlayer2] = useState(Player('Robot', 'CPU'));
  const [gameBoard1, setGameBoard1] = useState(Gameboard());
  const [gameBoard2, setGameBoard2] = useState(Gameboard());



  const Container = styled.div`
    display: flex;
    justify-content: space-around;
  `;

  return (
    <div>
      <Container>
        <Grid />
        <Grid />
      </Container>
    </div>
  );
}

export default App;
