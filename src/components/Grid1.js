import React, { useState, useEffect } from 'react';
import PlayerCell from './PlayerCell'
import styled from 'styled-components';
import Ship from '../factories/Ship';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 3.5vh);
    grid-template-rows: repeat(10, 3.5vh);
    border-collapse: collapse;
`;

const Grid1 = (props) => {
    const { turn, player2, board1, setTurn } = props

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



    const getRandomCoords = (arr) => {
        const getInt = () => Math.floor(Math.random() * Math.floor(10));
        arr.push(getInt());
        arr.push(getInt());
        return arr
    }

    const checkShots = (arr) => {
        const arrStr = JSON.stringify(arr);
        const shotsStr = JSON.stringify(shots);
        if (!shotsStr.includes(arrStr)) {
            return arr
        } else {
            arr = [];
            getRandomCoords(arr);
            return checkShots(arr);
        }
    }

    const attack = () => {
        let arr = [];
        getRandomCoords(arr);
        arr = checkShots(arr);
        return arr;
    };



    useEffect(() => {
        if (turn === false) {
          const move = attack()
          receiveAttack(move)
          setTurn(true)
        }
        
      }, [turn, setTurn, attack, receiveAttack])

    const createCells = () => {
        let cells = []
        let x = 0;
        let y = 0;
        for (let i = 1; i < 101 ; i++) {
            cells.push(<PlayerCell key={i} id={[x, y]} click={null} turn={turn} player2={player2} board1={board1} setTurn={setTurn} />)
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

// const Grid1 = (props) => {
//     const { turn, player2, board1, setTurn } = props

//     // useEffect(() => {
//     //     if (turn === false) {
//     //       const move = player2.attack(board1)
//     //       board1.receiveAttack(move)
//     //       setTurn(true)
//     //     }
        
//     //   }, [turn, board1, player2, setTurn])

//     const createCells = () => {
//         let cells = []
//         let x = 0;
//         let y = 0;
//         for (let i = 1; i < 101 ; i++) {
//             cells.push(<PlayerCell key={i} id={[x, y]} click={null} turn={turn} player2={player2} board1={board1} setTurn={setTurn} />)
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

export default Grid1;