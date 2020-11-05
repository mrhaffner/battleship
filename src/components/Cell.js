import React from 'react';
import styled from 'styled-components';

const Cell = (props) => {
    const Container = styled.div`
    background: purple;
    height: 20px;
    width: 20px;
    border: 1px black solid;
`;

    const { id } = props
    return (
        <Container id={id}>

        </Container>
    )
}

export default Cell;