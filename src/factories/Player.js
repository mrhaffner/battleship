const Player = (name, type) => {
    const getRandomCoords = (arr) => {
        const getInt = () => Math.floor(Math.random() * Math.floor(10));
        arr.push(getInt());
        arr.push(getInt());
        return arr
    }

    const checkShots = (arr, board) => {
        const arrStr = JSON.stringify(arr);
        const shotsStr = JSON.stringify(board.shots);
        if (!shotsStr.includes(arrStr)) {
            return arr
        } else {
            arr = [];
            getRandomCoords(arr);
            return checkShots(arr, board);
        }
    }

    const attack = (board, coords) => {
        if (type === 'CPU') {
            let arr = [];
            getRandomCoords(arr);
            arr = checkShots(arr, board);
            return arr;
        } else {
            return coords;
        }
        //coords get fed to proper gameboard (board 1 = human, board 2 = CPU)
    };
    return { name, attack, type };
};

export default Player;