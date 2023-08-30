export {solveSudoku};

function solveSudoku(board) {
    if (solve()) return board;

    return false;

    function solve() {
        let empty = getFirstEmpty();
        if (!empty) return true;

        const [i, j] = empty;
        const usedNums = getUsedNums(i, j);
        const notUsedNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].filter(num => !usedNums.has(num));

        while (notUsedNums.length) {
            let num = notUsedNums.pop();
            board[i][j] = num;
            
            if (solve()) return true;
        }

        board[i][j] = '.';
    }

    function getFirstEmpty() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') return [i, j];
            }
        }
    }

    function getUsedNums(i, j) {
        const usedNums = new Set();

        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== '.') usedNums.add(board[i][j]);
        }

        for (let i = 0; i < 9; i++) {
            if (board[i][j] !== '.') usedNums.add(board[i][j]);
        }

        const squareI = Math.floor(i / 3);
        const squareJ = Math.floor(j / 3);
        for (let i = squareI * 3; i < squareI * 3 + 3; i++) {
            for (let j = squareJ * 3; j < squareJ * 3 + 3; j++) {
                if (board[i][j] !== '.') usedNums.add(board[i][j]);
            }
        }

        return usedNums;
    }
}