import React, { useEffect } from 'react';
import PlayerCell from './PlayerCell'
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 3.5vh);
    grid-template-rows: repeat(10, 3.5vh);
    border-collapse: collapse;
`;

const Grid1 = (props) => {
    const { turn, player2, board1, setTurn } = props


    // useEffect(() => {
    //     if (turn === false) {
    //       const move = player2.attack(board1)
          
    //     }
    //     setTurn(true)
    //   }, [turn])

    const createCells = () => {
        let cells = []
        let x = 0;
        let y = 0;
        for (let i = 1; i < 101 ; i++) {
            cells.push(<PlayerCell key={i} id={[x, y]} click={null} />)
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

export default Grid1;