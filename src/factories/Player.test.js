import Player from './Player'

test('tests to see if Player.attack() return an integer from 0-10', () => {
    const Player2 = Player('CPU', 'CPU')
    expect(Player2.attack()[0]).toBeGreaterThanOrEqual(0);
    expect(Player2.attack()[0]).toBeGreaterThanOrEqual(0);
    expect(Player2.attack()[1]).toBeLessThanOrEqual(10);
    expect(Player2.attack()[1]).toBeLessThanOrEqual(10);
});

test('tests to see if Player.attack() will not return coordinates if type does not equal CPU', () => {
    const Player2 = Player('CPU', 'Player')
    expect(Player2.attack()).toBe(undefined);
});