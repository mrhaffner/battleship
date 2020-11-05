import React from 'react';
import Cell from './Cell'
import styled from 'styled-components';

const Grid = () => {

    //const { id, } = props
    const createCells = () => {
        let cells = []
        for (let i = 1; i < 101 ; i++) {
            cells.push(<Cell key={i} id={i} />)
        }
        return cells
    }

    const Container = styled.div`
        display: grid;
        grid-template-columns: repeat(10, 20px);
    `;

    return (
        <Container>
            { createCells() }
        </Container>
    )
}

export default Grid;