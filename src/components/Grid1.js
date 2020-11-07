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
    const { turn, setTurn, makeShip, setBoardReady, setLoseStatus1, loseStatus1, loseStatus2, setReset, reset } = props

    const [ships, setShips] = useState([]);

    const randomizeShips = () => {
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
        setBoardReady(true)
        setReset(false)
    }

    const showRandomizeButton = () => {
        if (turn === null && loseStatus1 === false && loseStatus2 === false) {
            return (<button onClick={randomizeShips}>Randomize Ships</button>)
        }
    }

    const [hits, setHits] = useState([[],[],[],[],[]]);

    const [misses, setMisses] = useState([]);
    const [shots, setShots] = useState([]);

    const getRandomCoords = (arr) => {
        const getInt = () => Math.floor(Math.random() * Math.floor(10));
        arr.push(getInt());
        arr.push(getInt());
        return arr
    }

    useEffect(() => {
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
        if (turn === false) {
          const move = attack()
          receiveAttack(move)
          setTurn(true)
        }
        
      }, [turn, setTurn, shots, hits, misses, ships])

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
                      setLoseStatus1(true);
                  }
              }
          }
          updateLoseStatus()
      }, [shipStatus])
      
      useEffect(() => {
        if (reset === true) {
            setShips([]);
            setHits([[[],[],[],[],[]]]);
            setMisses([]);
            setShots([]);
            setShipStatus([false, false, false, false, false])
        }
    }, [reset])

    const createCells = () => {
        let cells = []
        let x = 0;
        let y = 0;
        for (let i = 1; i < 101 ; i++) {
            cells.push(<PlayerCell key={i} id={[x, y]} turn={turn} setTurn={setTurn} shots={shots} ships={ships} reset={reset} />)
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
    const log3 = () => console.log(loseStatus1)
    const log4 = () => console.log(shipStatus)

    return (
        <Container>
            { createCells() }
            <button onClick={log1}>Misses</button>
            <button onClick={log2}>Shots</button>
            <button onClick={log3}>Lose Status</button>
            <button onClick={log4}>Ship Status</button>
            { showRandomizeButton() }
        </Container>
    )
}

export default Grid1;