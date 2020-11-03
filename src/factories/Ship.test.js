import Ship from './Ship'

test('tests that hit() correctly adds items to hits array', () => {
    const Ship1 = Ship(2);
    Ship1.hit(1);
    expect(Ship1.hits).toStrictEqual([1]);
});

test('tests that hit() correctly adds multiple items to hits array', () => {
    const Ship1 = Ship(2);
    Ship1.hit(1);
    Ship1.hit(2);
    expect(Ship1.hits).toStrictEqual([1, 2]);
});

test('tests that isSunk() returns true when called with an array with length === to length key', () => {
    const Ship1 = Ship(2);
    Ship1.hit(1);
    Ship1.hit(2);
    expect(Ship1.isSunk()).toBe(true);
});

test('tests that isSunk() returns false when called with an array with length !== to length key', () => {
    const Ship1 = Ship(3);
    Ship1.hit(1);
    Ship1.hit(2);
    expect(Ship1.isSunk()).toBe(false);
});
