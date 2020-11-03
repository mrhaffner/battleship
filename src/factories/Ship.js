const Ship = (length) => {
    const hit = position => hits.push(position);
    let hits = [];
    const isSunk = () => {
        return length === hits.length ? true : false;
    };
    return { length, hit, hits, isSunk, };
};

export default Ship;