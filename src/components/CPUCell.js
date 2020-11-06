import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: lightblue;
    height: 3.5vh;
    width: 3.5vh;
    border: .2vh black solid;
    text-align: center;
    font-size: 3vh;
`;

const CPUCell = (props) => {

    const { id, setTurn, turn, receiveAttack, ships } = props

    const [hit, setHit] = useState(false)

    const attackBoard2 = (e) => {
        let arr = e.target.id.split('')
        let newArr = []
        newArr.push(+arr[0])
        newArr.push(+arr[1])
        receiveAttack(newArr)
    }

    const click = (e) => {
        if (hit === false && turn === true) {
            e.target.textContent = 'x'
            attackBoard2(e)
            setTurn(false)
            setHit(true)
        }
    }

    const renderColor = (color) => {
        let arr = id.split('')
        let newArr = []
        newArr.push(+arr[0])
        newArr.push(+arr[1])
        let idStr = JSON.stringify(newArr);
        for (let ship of ships) {
            let shipStr = JSON.stringify(ship);
            if (shipStr.includes(idStr)) return color
        }
    }



    return (
        <Container id={id} onClick={click} className='cell' style={{backgroundColor: renderColor('purple'), color: renderColor('red')}}></Container>
    )
}

export default CPUCell;