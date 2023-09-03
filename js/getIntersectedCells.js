export {getIntersectedCells};

function getIntersectedCells(board, num, cords) {
    const intersection = new Set();

    const [i, j] = cords;

    for (let j = 0; j < 9; j++) {
        if (j === cords[1]) continue;
        if (board[i][j] === num) intersection.add(`${i},${j}`);
    }

    for (let i = 0; i < 9; i++) {
        if (i === cords[0]) continue;
        if (board[i][j] === num) intersection.add(`${i},${j}`);
    }

    const squareI = Math.floor(i / 3);
    const squareJ = Math.floor(j / 3);
    for (let i = squareI * 3; i < squareI * 3 + 3; i++) {
        for (let j = squareJ * 3; j < squareJ * 3 + 3; j++) {
            if (i === cords[0] && j === cords[1]) continue;
            if (board[i][j] === num) intersection.add(`${i},${j}`);
        }
    }

    return [...intersection.values()].map( cell => cell.split(',').map(cord => +cord) );
}