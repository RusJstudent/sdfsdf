export {removeElems};

function removeElems(board, rest, k = 0) {
    const cells = getCells();

    let times = 81 - rest;

    while (times && cells.length) {
        const randomCell = Math.floor( Math.random() * cells.length );
        const [i, j] = cells.splice(randomCell, 1)[0];

        if (isRemovable(board, [i, j], k)) {
            board[i][j] = '.';
            times--;
        }
    }
}

function getCells() {
    const cells = [];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            cells.push([i, j]);
        }
    }

    return cells;
}

function isRemovable(board, cords, k) {
    const [i, j] = cords;

    return rowCheck() && colCheck();

    function rowCheck() {
        let num = 0;

        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== '.') num++;
        }

        return num > k;
    }

    function colCheck() {
        let num = 0;

        for (let i = 0; i < 9; i++) {
            if (board[i][j] !== '.') num++;
        }

        return num > k;
    }
}