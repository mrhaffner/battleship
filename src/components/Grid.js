import React from 'react';
import Cell from './Cell'

const Grid = () => {

    //const { id, } = props
    const createCells = () => {
        let cells = []
        for (let i = 1; i < 101 ; i++) {
            cells.push(<Cell key={i} id={i} />)
        }
        return cells
    }

    return (
        <div>
            { createCells() }
        </div>
    )
}

export default Grid;