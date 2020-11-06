import React, { useState, useEffect } from 'react';
import CPUCell from './CPUCell';
import styled from 'styled-components';
import _ from 'lodash';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 3.5vh);
    grid-template-rows: repeat(10, 3.5vh);
    border-collapse: collapse;
`;

const Grid2 = (props) => {
    const { setTurn, turn } = props

    //can probably move the functions to app and pass them down as props to both gameboards
    const [ships, setShips] = useState([[[0,0],[0,1]],[[1,0],[1,1],[1,2]]]);
    const [hits, setHits] = useState([[],[],[],[],[]]);
    
    // const addShip = (length, ...location) => {
    //     //need to Import Ship or something
    //     setShips([...ships, Ship(length, ...location)])
    // };

    const [misses, setMisses] = useState([]);
    const [shots, setShots] = useState([]);
    const receiveAttack = (coords) => {
        for (let i = 0; i < ships.length; i++) {
            let shipStr = JSON.stringify(ships[i]);
            let coordStr = JSON.stringify(coords);
            if (shipStr.includes(coordStr)) {
                //probably need to change this, maybe use lodash _.deepClone() or slice?
                let clone = _.deepClone(hits)
                clone[i].push(coords)
                setHits(clone)
                setShots([...shots, coords]);
                return;
            }
        } 
        setMisses([...misses, coords]);
        setShots([...shots, coords]);
    };

    const [loseStatus, setLoseStatus] = useState(false);
    const [shipStatus, setShipStatus] = useState([false, false, false, false, false])
    useEffect(() => {
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].length === hits[i].length) {
                //maybe push i into a new state array?
                //if state array has length of 5, the setStatus(false)
                let arr = [...shipStatus]
                arr[i] = true
                setShipStatus(arr);
                
            }
        }
        for (let i = 0; i < ships.length; i++) {
            if (shipStatus[i] === false) break;
            if (i === 4) {
                setLoseStatus(true);
            }
        }
        
    }, [ships])

    const createCells = () => {
        let cells = []
        let x = 0;
        let y = 0;
        for (let i = 1; i < 101 ; i++) {
            cells.push(<CPUCell key={i} id={`${x}${y}`} setTurn={setTurn} turn={turn} receiveAttack={receiveAttack} />)
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

export default Grid2;