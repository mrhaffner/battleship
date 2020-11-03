import Gameboard from './Gameboard'

test.skip('tests that addShip adds a new ship to the ships array with proper coordinates', () => {
    const Gameboard1 = Gameboard();
    Gameboard1.addShip(2, [0, 0], [0, 1]);
    expect(Gameboard1.ships[0].location).toStrictEqual([[0, 0], [0, 1]]);
});

test.skip('tests that receiveAttack correctly determines when a ship is hit and pushs those coords to hits array', () => {
    const Gameboard1 = Gameboard();
    Gameboard1.addShip(2, [0, 0], [0, 1]);
    Gameboard1.receiveAttack([0, 0])
    expect(Gameboard1.ships[0].hits).toStrictEqual([[0, 0]]);
});

test.skip('tests that receiveAttack correctly determines when a ship is not hit and pushes those coords to misses array', () => {
    const Gameboard1 = Gameboard();
    Gameboard1.addShip(2, [0, 0], [0, 1]);
    Gameboard1.receiveAttack([2, 2]);
    expect(Gameboard1.misses).toStrictEqual([[2, 2]]);
});

test.skip('tests that receiveAttack correctly determines when a ship is not hit and does not push those coords to misses array', () => {
    const Gameboard1 = Gameboard();
    Gameboard1.addShip(2, [0, 0], [0, 1]);
    Gameboard1.receiveAttack([0, 0]);
    expect(Gameboard1.misses).toStrictEqual([]);
});

test.skip('tests that the object displays true if all ships are sunk', () => {
    const Gameboard1 = Gameboard();
    Gameboard1.addShip(1, [0, 0]);
    Gameboard1.receiveAttack([0, 0]);
    expect(Gameboard1.status()).toBe(true);
});