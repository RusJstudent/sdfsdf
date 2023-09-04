export {validateNum};

function validateNum(board, num, cords) { // isValidNum(input, '9', [0, 8])
    const [i, j] = cords;

    const usedNums = new Set();

    for (let j = 0; j < 9; j++) {
        if (j === cords[1]) continue;
        if (board[i][j] !== '.') usedNums.add(board[i][j]);
    }

    for (let i = 0; i < 9; i++) {
        if (i === cords[0]) continue;
        if (board[i][j] !== '.') usedNums.add(board[i][j]);
    }

    const squareI = Math.floor(i / 3);
    const squareJ = Math.floor(j / 3);
    for (let i = squareI * 3; i < squareI * 3 + 3; i++) {
        for (let j = squareJ * 3; j < squareJ * 3 + 3; j++) {
            if (i === cords[0] && j === cords[1]) continue;
            if (board[i][j] !== '.') usedNums.add(board[i][j]);
        }
    }

    return !usedNums.has(num);
}