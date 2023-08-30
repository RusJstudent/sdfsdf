export {swap};

function swap(board, times = 10) {
    const methods = [replaceColsWithRows, swapRows, swapCols, swapRegionsRow, swapRegionsCol];

    for (let i = 0; i < times; i++) {
        const random = Math.floor( Math.random() * methods.length );
        methods[random](board);
    }
}

function replaceColsWithRows(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = i + 1; j < 9; j++) {
            [board[i][j], board[j][i]] = [board[j][i], board[i][j]];
        }
    }
}

function swapRows(board) {
    const region = Math.floor( Math.random() * 3 );
    const rows = [0, 1, 2];
    rows.splice( Math.floor( Math.random() * 3 ), 1 );
    const [first, second] = rows;
    const [a, b] = [region * 3 + first, region * 3 + second];

    for (let j = 0; j < 9; j++) {
        [board[a][j], board[b][j]] = [board[b][j], board[a][j]];
    }
}

function swapCols(board) {
    const region = Math.floor( Math.random() * 3 );
    const cols = [0, 1, 2];
    cols.splice( Math.floor( Math.random() * 3 ), 1 );
    const [first, second] = cols;
    const [a, b] = [region * 3 + first, region * 3 + second];

    for (let i = 0; i < 9; i++) {
        [board[i][a], board[i][b]] = [board[i][b], board[i][a]];
    }
}

function swapRegionsRow(board) {
    const regions = [0, 1, 2];
    regions.splice( Math.floor( Math.random() * 3 ), 1 );
    const [first, second] = regions;

    for (let k = 0; k < 3; k++) {
        const [a, b] = [first * 3 + k, second * 3 + k];
        for (let j = 0; j < 9; j++) {
            [board[a][j], board[b][j]] = [board[b][j], board[a][j]];
        }
    }
}

function swapRegionsCol(board) {
    const regions = [0, 1, 2];
    regions.splice( Math.floor( Math.random() * 3 ), 1 );
    const [first, second] = regions;

    for (let k = 0; k < 3; k++) {
        const [a, b] = [first * 3 + k, second * 3 + k];
        for (let i = 0; i < 9; i++) {
            [board[i][a], board[i][b]] = [board[i][b], board[i][a]];
        }
    }
}