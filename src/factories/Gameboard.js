import Ship from './Ship'

const Gameboard = () => {
    const ships = [];
    const addShip = (length, ...location) => {
        ships.push(Ship(length, ...location))
    };
    const receiveAttack = (coords) => {
        for (let ship of ships) {
            let shipStr = JSON.stringify(ship.location);
            let coordStr = JSON.stringify(coords);
            if (shipStr.includes(coordStr)) {
                ship.hit(coords);
                return;
            }
            misses.push(coords);
        } 
    };
    const misses = [];
    const status = () => {
        for (let ship of ships) {
            if (!ship.isSunk()) {
                return false;
            }
            return true;
        }
    };
    return { ships, addShip, receiveAttack, misses, status };
};

export default Gameboard;