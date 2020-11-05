import React, { useState, useEffect } from 'react';
import CPUCell from './CPUCell';
import styled from 'styled-components';
import Ship from '../factories/Ship';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 3.5vh);
    grid-template-rows: repeat(10, 3.5vh);
    border-collapse: collapse;
`;

const Grid2 = (props) => {
    const { setTurn, board2, turn } = props

    //can probably move the functions to app and pass them down as props to both gameboards
    const [ships, setShips] = useState([]);
    const addShip = (length, ...location) => {
        //need to Import Ship or something
        setShips([...ships, Ship(length, ...location)])
    };

    const [misses, setMisses] = useState([]);
    const [shots, setShots] = useState([]);
    const receiveAttack = (coords) => {
        for (let ship of ships) {
            let shipStr = JSON.stringify(ship.location);
            let coordStr = JSON.stringify(coords);
            if (shipStr.includes(coordStr)) {
                //probably need to change this
                ship.hit(coords);
                setShots([...shots, coords]);
                return;
            }
        } 
        setMisses([...misses, coords]);
        setShots([...shots, coords]);
    };

    const [status, setStatus] = useState(false);
    useEffect(() => {
        for (let ship of ships) {
            if (ship.isSunk()) {
                setStatus(false);
            }
        }
    }, [ships])
    


    const createCells = () => {
        let cells = []
        let x = 0;
        let y = 0;
        for (let i = 1; i < 101 ; i++) {
            cells.push(<CPUCell key={i} id={`${x}${y}`} setTurn={setTurn} board2={board2} turn={turn} receiveAttack={receiveAttack} />)
            if (x === 9) {
                x = 0;
                y++;
            } else {
                x++;
            };
        }
        return cells
    }

    const log1 = () => console.log(misses)
    const log2 = () => console.log(shots)

    return (
        <Container>
            { createCells() }
            <button onClick={log1}>Board 1</button>
            <button onClick={log2}>Board 2</button>
        </Container>
    )
}

// const Grid2 = (props) => {
//     const { setTurn, board2, turn } = props

//     const createCells = () => {
//         let cells = []
//         let x = 0;
//         let y = 0;
//         for (let i = 1; i < 101 ; i++) {
//             cells.push(<CPUCell key={i} id={`${x}${y}`} setTurn={setTurn} board2={board2} turn={turn} />)
//             if (x === 9) {
//                 x = 0;
//                 y++;
//             } else {
//                 x++;
//             };
//         }
//         return cells
//     }

//     return (
//         <Container>
//             { createCells() }
//         </Container>
//     )
// }

export default Grid2;