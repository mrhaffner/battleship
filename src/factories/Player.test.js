import Player from './Player'

test('tests to see if Player.attack() return an integer from 0-10', () => {
    const Player2 = Player('CPU', 'CPU')
    const board = {
        misses: [],
        ships: [
            {
                hits: []
            }
        ],
    }
    expect(Player2.attack(board)[0]).toBeGreaterThanOrEqual(0);
    expect(Player2.attack(board)[0]).toBeGreaterThanOrEqual(0);
    expect(Player2.attack(board)[1]).toBeLessThanOrEqual(10);
    expect(Player2.attack(board)[1]).toBeLessThanOrEqual(10);
});

test('tests to see if Player.attack() will not return coordinates if type does not equal CPU', () => {
    const board = {
        misses: [],
        ships: [
            {
                hits: []
            }
        ],
    }
    const Player2 = Player('CPU', 'Player')
    expect(Player2.attack(board)).toBe(undefined);
});


test.skip('tests to see if Player.attack() will work with coords in hits array', () => {
    const board = {
        misses: [],
        ships: [
            {
                hits: [[0, 0], [0, 1], [1, 0]]
            }
        ],
    }
    const Player2 = Player('CPU', 'CPU')
    expect(Player2.attack(board)).toStrictEqual([1, 1]);
});

test('tests to see if Player.attack() will work with coords in misses array', () => {
    const board = {
        misses: [[0, 0], [0, 1], [1, 0]],
        ships: [
            {
                hits: []
            }
        ],
    }
    const Player2 = Player('CPU', 'CPU')
    expect(Player2.attack(board)).toStrictEqual([1, 1]);
});
