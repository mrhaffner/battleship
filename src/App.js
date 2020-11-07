import React, { useState, useEffect } from 'react';
import Grid1 from './components/Grid1'
import Grid2 from './components/Grid2'
import styled from 'styled-components';

const Container = styled.div`
display: flex;
justify-content: space-around;
`;

const App = () => {
  const [turn, setTurn] = useState(null)

  const [boardReady, setBoardReady] = useState(false)

  const showStartButton = () => {
    if (boardReady === true) {
      return <button onClick={startGame}>Start Game</button>
    } else  {
      return null
    }
  }

  const startGame = () => {
    setTurn(true)
    setBoardReady(false)
  }

  const makeShip = (length) => {
    let ship = []
    let path = Math.floor(Math.random() * Math.floor(2))
    if (path === 0) {
        let x = Math.floor(Math.random() * Math.floor(10)) 
        let y = Math.floor(Math.random() * Math.floor(10 - length))
        for (let i = 0; i < length; i++) {
            ship.push([x, y])
            y++
        }
    } else {
        let y = Math.floor(Math.random() * Math.floor(10)) 
        let x = Math.floor(Math.random() * Math.floor(10 - length))
        for (let i = 0; i < length; i++) {
            ship.push([x, y])
            x++
        }
    }
    return ship
  }

  const [loseStatus1, setLoseStatus1] = useState(false);
  const [loseStatus2, setLoseStatus2] = useState(false);

  return (
    <div>
      <Container>
        <Grid1 turn={turn} setTurn={setTurn} makeShip={makeShip} setBoardReady={setBoardReady} setLoseStatus1={setLoseStatus1} loseStatus1={loseStatus1} />
        <Grid2 turn={turn} setTurn={setTurn} makeShip={makeShip} setLoseStatus2={setLoseStatus2} loseStatus2={loseStatus2} />
        { showStartButton() }
      </Container>
    </div>
  );
}

export default App;
