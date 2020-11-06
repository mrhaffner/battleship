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

    const { id, setTurn, turn, receiveAttack } = props

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

    return (
        <Container id={id} onClick={click} className='cell' ></Container>
    )
}

export default CPUCell;