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
    const { setTurn, turn, makeShip, setLoseStatus2, reset } = props

    const [ships, setShips] = useState([]);

    const setCPUShips = () => {
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
    }

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
    
    useEffect(() => {
        if (reset === true) {
            setShips([]);
            setHits([[],[],[],[],[]]);
            setMisses([]);
            setShots([]);
            setShipStatus([false, false, false, false, false])
        } else {
            setCPUShips()
        }
    }, [reset])

    const createCells = () => {
        let cells = []
        let x = 0;
        let y = 0;
        for (let i = 1; i < 101 ; i++) {
            cells.push(<CPUCell key={i} id={`${x}${y}`} setTurn={setTurn} turn={turn} receiveAttack={receiveAttack} ships={ships} reset={reset} />)
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