const Ship = (length) => {
    const hit = position => this.hits.push(position);
    let hits = [];
    const isSunk = () => {
        return this.length === this.hits.length ? true : false;
    };
    return { length, hit, hits, isSunk, };
};

export default Ship;