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

  //const [board2, setBoard2] = useState(null);
  const [turn, setTurn] = useState(null)

  let player1 = Player('Hu-Man', 'Human');
  let player2 = Player('Robot', 'CPU');
  let board1 = Gameboard();
  let board2 = Gameboard();

  useEffect(() => {
 
    //this will need to happen after ship selection in the future
    setTurn(true)
  }, [])



  // useEffect(() => {
  //   turn === true ? setTurn(false) : setTurn(true)
  // })

  return (
    <div>
      <Container>
        <Grid1 turn={turn} player2={player2} board1={board1} setTurn={setTurn} />
        <Grid2 setTurn={setTurn} board2={board2} turn={turn} />
      </Container>
    </div>
  );
}

export default App;
