import React, { useState, useEffect } from 'react';
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

    const { id, shots } = props

    const [hit, setHit] = useState(null)

    const displayHit = () => {
        let shotsStr = JSON.stringify(shots);
        let newArrStr = JSON.stringify(id);
        if (shotsStr.includes(newArrStr)) {
            setHit('x')
        }
    }
   
    useEffect(() => {
        displayHit()
    }, [displayHit])

    return (
        <Container id={id} className='cell'>{hit}</Container>
    )
}

export default PlayerCell;