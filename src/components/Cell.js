import React from 'react';
import styled from 'styled-components';

const Cell = (props) => {
    const Container = styled.div`
        background-color: lightblue;
        height: 3.5vh;
        width: 3.5vh;
        border: .2vh black solid;
    `;

    const gimme = (e) => {
        e.target.textContent = 'x'
        console.log(id)
    }

    const { id } = props
    return (
        <Container id={id} onClick={gimme}></Container>
    )
}

export default Cell;