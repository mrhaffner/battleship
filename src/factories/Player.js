const Player = (name, type) => {
    const getRandomCoords = (arr) => {
        let getInt = () => Math.floor(Math.random() * Math.floor(2));
        arr.push(getInt());
        arr.push(getInt());
        return arr
    }

    const checkShots = (arr, board) => {
        let arrStr = JSON.stringify(arr);
        let shotsStr = JSON.stringify(board.shots);
        if (!shotsStr.includes(arrStr)) {
            return arr
        } else {
            arr = [];
            getRandomCoords(arr);
            return checkShots(arr, board);
        }
    }





    const attack = (board) => {
        if (type === 'CPU') {
            let arr = [];
            getRandomCoords(arr);
            arr = checkShots(arr, board);
            return arr;
        }
        //else (human)
            //select coords to enter
        //coords get fed to proper gameboard (board 1 = human, board 2 = CPU)

    };
    return { name, attack, type };
};

export default Player;