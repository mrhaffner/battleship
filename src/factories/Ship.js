const Ship = (length, ...location) => {
    const hit = position => hits.push(position);
    let hits = [];
    const isSunk = () => {
        return length === hits.length ? true : false;
    };
    return { length, hit, hits, isSunk, location, };
};

export default Ship;