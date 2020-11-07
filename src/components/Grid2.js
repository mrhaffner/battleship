import React, { useState, useEffect } from 'react';
import CPUCell from './CPUCell';
import styled from 'styled-components';
import * as _ from 'lodash';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 3.5vh);
    grid-template-rows: repeat(10, 3.5vh);
    border-collapse: collapse;
`;

const Grid2 = (props) => {
    const { setTurn, turn, makeShip, setLoseStatus2, loseStatus2 } = props

    const [ships, setShips] = useState([]);
    //maybe the inside of this should all be one function that is passed down to both grid from app?
    useEffect(() => { 
        let arr = []
        let newShip
        const checkShip = () => {
            for (let ship of newShip) {
                let shipStr = JSON.stringify(ship);
                let arrStr = JSON.stringify(arr)
                if (arrStr.includes(shipStr)) {
                    return true
                }
            }
        }
        arr.push(makeShip(3))
        for (let j = 2; j < 6; j++) {
            newShip = makeShip(j)
            if (checkShip()) {
                j--
            } else {
                arr.push(newShip)
            }
        }
        setShips(arr)
    }, [])

    const [hits, setHits] = useState([[],[],[],[],[]]);

    const [misses, setMisses] = useState([]);
    const [shots, setShots] = useState([]);

    const receiveAttack = (coords) => {
        for (let i = 0; i < ships.length; i++) {
            let shipStr = JSON.stringify(ships[i]);
            let coordStr = JSON.stringify(coords);
            if (shipStr.includes(coordStr)) {
                let clone = _.cloneDeep(hits)
                clone[i].push(coords)
                setHits(clone)
                setShots([...shots, coords]);
                return;
            }
        } 
        setMisses([...misses, coords]);
        setShots([...shots, coords]);
    };

    const [shipStatus, setShipStatus] = useState([false, false, false, false, false])

    useEffect(() => {
        const updateShipStatus = () => {
            let arr = [...shipStatus]
            for (let i = 0; i < ships.length; i++) {
                if (ships[i].length === hits[i].length) {
                    arr[i] = true
                }
            }
            setShipStatus(arr);
        }
        updateShipStatus()
    }, [hits])

    //pass down internals from app?
    useEffect(() => {
        const updateLoseStatus = () => {
            for (let i = 0; i < ships.length; i++) {
                if (shipStatus[i] === false) break;
                if (i === 4) {
                    setLoseStatus2(true);
                }
            }
        }
        updateLoseStatus()
    }, [shipStatus])
    
    const createCells = () => {
        let cells = []
        let x = 0;
        let y = 0;
        for (let i = 1; i < 101 ; i++) {
            cells.push(<CPUCell key={i} id={`${x}${y}`} setTurn={setTurn} turn={turn} receiveAttack={receiveAttack} ships={ships} />)
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
    const log3 = () => console.log(loseStatus2)
    const log4 = () => console.log(shipStatus)
    const log5 = () => console.log(ships)

    return (
        <Container>
            { createCells() }
            <button onClick={log1}>Misses</button>
            <button onClick={log2}>Shots</button>
            <button onClick={log3}>Lose Status</button>
            <button onClick={log4}>Ship Status</button>
            <button onClick={log5}>Ships</button>
        </Container>
    )
}

export default Grid2;