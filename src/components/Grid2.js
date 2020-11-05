import React, { useEffect } from 'react';
import CPUCell from './CPUCell'
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 3.5vh);
    grid-template-rows: repeat(10, 3.5vh);
    border-collapse: collapse;
`;

const Grid2 = (props) => {
    const { setTurn, board2, turn } = props

    const createCells = () => {
        let cells = []
        let x = 0;
        let y = 0;
        for (let i = 1; i < 101 ; i++) {
            cells.push(<CPUCell key={i} id={`${x}${y}`} setTurn={setTurn} board2={board2} turn={turn} />)
            if (x === 9) {
                x = 0;
                y++;
            } else {
                x++;
            };
        }
        return cells
    }

    return (
        <Container>
            { createCells() }
        </Container>
    )
}

export default Grid2;