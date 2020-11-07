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
  
  const displayLoseStatus = () => {
    if (loseStatus1 === true) {
      return (<h2>CPU Wins</h2>)
    } else if (loseStatus2 === true) {
      return (<h2>Human Wins</h2>)
    }
  }

  const [reset, setReset] = useState(false);

  const newGame = () => {
    setTurn(null);
    setLoseStatus1(false);
    setLoseStatus2(false);
    setReset(true);
    //resetboard uis/arrays
     //maybe a hook in each grid component?
  }

  const showNewButton = () => {
    if (loseStatus1 === true || loseStatus2 === true) {
      return <button onClick={newGame}>New Game</button>
    }
  }

  useEffect(() => {
    if (loseStatus1 === true || loseStatus2 === true) {
      setTurn(null)
    }
  }, [loseStatus1, loseStatus2])

  return (
    <div>
      <Container>
        <Grid1 turn={turn} setTurn={setTurn} makeShip={makeShip} setBoardReady={setBoardReady} setLoseStatus1={setLoseStatus1} loseStatus1={loseStatus1} loseStatus2={loseStatus2} reset={reset} setReset={setReset} />
        <Grid2 turn={turn} setTurn={setTurn} makeShip={makeShip} setLoseStatus2={setLoseStatus2} loseStatus2={loseStatus2} reset={reset} />
        { showStartButton() }
        { displayLoseStatus() }
        { showNewButton() }
      </Container>
    </div>
  );
}

export default App;