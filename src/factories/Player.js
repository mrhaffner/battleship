const Player = (name, type) => {
    //players can take turns playing the game by attacking the enemy Gameboard.
    const getRandomCoords = (arr) => {
        let getInt = () => Math.floor(Math.random() * Math.floor(2));
        arr.push(getInt());
        arr.push(getInt());
        return arr;
    }

    const checkMisses = (arr, board) => {
        for (let miss of board.misses) {   
            if (arr[0] === miss[0] && arr[1] === miss[1]) {
                arr = []
                getRandomCoords(arr);
                checkCoords(arr, board);
                return arr;
            } 
        }
    }

    const checkShips = (arr, board) => {
        for (let shipObj of board.ships) {
            for (let ship of shipObj.hits) {  
                if (arr[0] === ship[0] && arr[1] === ship[1]) {
                    arr = []
                    getRandomCoords(arr);
                    checkCoords(arr, board);
                    return arr;
                }
            }
        }
    }

    const checkCoords = (arr, board) => {
        //Ship.misses
        checkMisses(arr, board);
        //Ship.Ships.hits
        checkShips(arr, board);
    }

    const attack = (board) => {
        if (type === 'CPU') {
            let arr = [];
            getRandomCoords(arr);
            checkCoords(arr, board);
            return arr;
        }
                //if those coordinates are in Ship.misses OR loops ships array in Ship.Ships.hits
                    //rerun those coordinates else return them
        //else (human)
            //select coords to enter
        //coords get fed to proper gameboard (board 1 = human, board 2 = CPU)

    };
    return { name, attack, type };
};

export default Player;