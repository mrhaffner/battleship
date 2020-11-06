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

    const { id, shots, ships } = props

    const [hit, setHit] = useState(null)

    const displayHit = (color) => {
        let shotsStr = JSON.stringify(shots);
        let newArrStr = JSON.stringify(id);
        if (shotsStr.includes(newArrStr)) {
            setHit('x')
        }
    }
   
    useEffect(() => {
        displayHit()
    }, [displayHit])

    const renderColor = (color) => {
        let idStr = JSON.stringify(id);
        for (let ship of ships) {
            let shipStr = JSON.stringify(ship);
            if (shipStr.includes(idStr)) return color
        }
    }

    return (
        <Container id={id} className='cell' style={{backgroundColor: renderColor('purple'), color: renderColor('red')}}>{hit} </Container>
    )
}

export default PlayerCell;