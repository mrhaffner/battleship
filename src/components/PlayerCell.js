import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
background-color: lightblue;
height: 3.5vh;
width: 3.5vh;
border: .2vh black solid;
text-align: center;
font-size: 3vh;
`;

const PlayerCell = (props) => {

    const { id, setTurn, board2, turn } = props

    const [hit, setHit] = useState(false)

    

    return (
        <Container id={id} className='cell' ></Container>
    )
}

export default PlayerCell;