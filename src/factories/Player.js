const Player = (name, type) => {
    //players can take turns playing the game by attacking the enemy Gameboard.
    const attack = () => {
        if (type === 'CPU') {
            //math.Random integers for two coordinates, within a specific range
            let getInt = () => Math.floor(Math.random() * Math.floor(10))
            let arr = []
            arr.push(getInt())
            arr.push(getInt())
            return arr;
        }
                //if those coordinates are in Ship.misses OR loops ships array in Ship.Ships.hits
                    //rerun those coordinates else return them
        //else (human)
            //select coords to enter
        //coords get fed to proper gameboard (board 1 = human, board 2 = CPU)

    }
    return { name, attack, type };
};

export default Player;