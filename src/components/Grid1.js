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
              //this needs to run after the first loop
              //maybe put it into it's own function
              for (let i = 0; i < ships.length; i++) {
                  if (shipStatus[i] === false) break;
                  //make sure to change this back to 4
                  if (i === 1) {
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