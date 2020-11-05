import React from 'react';
import Cell from './Cell'
import styled from 'styled-components';

const Grid = () => {

    //const { id, } = props
    const createCells = () => {
        let cells = []
        let x = 0;
        let y = 0;
        for (let i = 1; i < 101 ; i++) {
            cells.push(<Cell key={i} id={[x, y]} />)
            if (x === 9) {
                x = 0;
                y++;
            } else {
                x++;
            };
        }
        return cells
    }

    const Container = styled.div`
        display: grid;
        grid-template-columns: repeat(10, 3.5vh);
    `;

    return (
        <Container>
            { createCells() }
        </Container>
    )
}

export default Grid;