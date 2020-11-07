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
    const { id, shots, ships, reset } = props;
    const [hit, setHit] = useState(false);

    useEffect(() => {
        const displayHit = () => {
            let shotsStr = JSON.stringify(shots);
            let newArrStr = JSON.stringify(id);
            if (shotsStr.includes(newArrStr)) {
                setHit('x')
            };
        };
        displayHit()
    }, [id, shots])

    const renderColor = (color) => {
        let idStr = JSON.stringify(id);
        for (let ship of ships) {
            let shipStr = JSON.stringify(ship);
            if (shipStr.includes(idStr)) return color;
        };
    };

    useEffect(() => {
        if (reset === true) {
            setHit(false);
        }
    }, [reset])

    return (
        <Container id={id} className='cell' style={{backgroundColor: renderColor('purple'), color: renderColor('red')}}>
            {hit}
        </Container>
    )
};

export default PlayerCell;