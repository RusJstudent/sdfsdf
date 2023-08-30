export {createEmptyBoard};

function createEmptyBoard() {
    const board = [];

    for (let i = 0; i < 9; i++) {
        board.push([]);

        for (let j = 0; j < 9; j++) {
            board[i][j] = '.';
        }
    }

    return board;
}