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

  useEffect(() => {
    //this will need to happen after ship selection in the future
    setTurn(true)
  }, [])

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

  return (
    <div>
      <Container>
        <Grid1 turn={turn} setTurn={setTurn} makeShip={makeShip} />
        <Grid2 turn={turn} setTurn={setTurn} makeShip={makeShip} />
      </Container>
    </div>
  );
}

export default App;
