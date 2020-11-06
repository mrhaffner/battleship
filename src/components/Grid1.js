import React, { useState, useEffect } from 'react';
import PlayerCell from './PlayerCell'
import styled from 'styled-components';
import * as _ from 'lodash';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 3.5vh);
    grid-template-rows: repeat(10, 3.5vh);
    border-collapse: collapse;
`;

const Grid1 = (props) => {
    const { turn, setTurn } = props

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
                //probably need to change this
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

    const [loseStatus, setLoseStatus] = useState(false);
    const [shipStatus, setShipStatus] = useState([false, false, false, false, false])
    // useEffect(() => {
    //     for (let i = 0; i < ships.length; i++) {
    //         if (ships[i].length === hits[i].length) {
    //             //maybe push i into a new state array?
    //             //if state array has length of 5, the setStatus(false)
    //             let arr = [...shipStatus]
    //             arr[i] = true
    //             setShipStatus(arr);
                
    //         }
    //     }
    //     for (let i = 0; i < ships.length; i++) {
    //         if (shipStatus[i] === false) break;
    //         if (i === 4) {
    //             setLoseStatus(true);
    //         }
    //     }
        
    // }, [hits, shipStatus, ships])

    const updateStatus = () => {
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
    }

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
            cells.push(<PlayerCell key={i} id={[x, y]} turn={turn} setTurn={setTurn} shots={shots} ships={ships} />)
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

    return (
        <Container>
            { createCells() }
            <button onClick={log1}>Misses</button>
            <button onClick={log2}>Shots</button>
            <button onClick={log3}>Lose Status</button>
            <button onClick={log4}>Ship Status</button>
        </Container>
    )
}

export default Grid1;