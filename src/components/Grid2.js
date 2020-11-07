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
    const { setTurn, turn } = props

    const [ships, setShips] = useState([]);


    const makeShip = (length) => {
        let ship = []
        let path = Math.floor(Math.random() * Math.floor(2))
        if (path === 0) {
            let x = Math.floor(Math.random() * Math.floor(10)) 
            let y = Math.floor(Math.random() * Math.floor(10 - length))
            for (let i = 0; i < length; i++) {
                ship.push([x, y])
                y++
            }
        } else {
            let y = Math.floor(Math.random() * Math.floor(10)) 
            let x = Math.floor(Math.random() * Math.floor(10 - length))
            for (let i = 0; i < length; i++) {
                ship.push([x, y])
                x++
            }
        }
        return ship
    }

    useEffect(() => {
        let arr = []
        for (let j = 2; j < 6; j++) {
            makeShip(j)
            //check here if ship has coords already in array, if so get a new ship with same length and check it again
            arr.push(makeShip(j))
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
                    console.log(arr, arr[i])
                    arr[i] = true
                    console.log(arr, arr[i])
                }
            }
            setShipStatus(arr);
        }
        updateShipStatus()
    }, [hits])
    
    const [loseStatus, setLoseStatus] = useState(false);

    useEffect(() => {
        const updateLoseStatus = () => {
            for (let i = 0; i < ships.length; i++) {
                if (shipStatus[i] === false) break;
                if (i === 4) {
                    setLoseStatus(true);
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
    const log3 = () => console.log(loseStatus)
    const log4 = () => console.log(shipStatus)
    const log5 = () => console.log(ships)

    return (
        <Container>
            { createCells() }
            <button onClick={log1}>Misses</button>
            <button onClick={log2}>Shots</button>
            <button onClick={log3}>Lose Status</button>
            {/* <button onClick={updateShipStatus}>Update Ship Status</button> */}
            <button onClick={log4}>Ship Status</button>
            <button onClick={log5}>Ships</button>
        </Container>
    )
}

export default Grid2;