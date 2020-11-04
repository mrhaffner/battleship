const Player = (name, type) => {
    const getRandomCoords = (arr) => {
        let getInt = () => Math.floor(Math.random() * Math.floor(2));
        arr.push(getInt());
        arr.push(getInt());
        return arr
    }

    const checkMisses = (arr, board) => {
        let arrStr = JSON.stringify(arr);
        let missesStr = JSON.stringify(board.misses);
        if (!missesStr.includes(arrStr)) {
            return arr
        } else {
            arr = [];
            getRandomCoords(arr);
            return checkMisses(arr, board);
        }
    }

    // const checkShips = (arr, board) => {
    //     for (let shipObj of board.ships) {
    //         for (let ship of shipObj.hits) {  
    //             if (arr[0] === ship[0] && arr[1] === ship[1]) {
    //                 arr = []
    //                 getRandomCoords(arr);
    //                 checkCoords(arr, board);
                    
    //             }
    //         }
    //     }
    // }

    const checkCoords = (arr, board) => {
        //Ship.misses
        arr = checkMisses(arr, board);
        //Ship.Ships.hits
        //checkShips(arr, board);
        return arr
    }

    const attack = (board) => {
        if (type === 'CPU') {
            let arr = [];
            getRandomCoords(arr);
            arr = checkCoords(arr, board);
            return arr;
        }
        //else (human)
            //select coords to enter
        //coords get fed to proper gameboard (board 1 = human, board 2 = CPU)

    };
    return { name, attack, type };
};

export default Player;