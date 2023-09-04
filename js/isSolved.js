export {isSolved};

function isSolved(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === '.') return false;
        }
    }

    return validateSudoku(board);
}

function validateSudoku(board) {
    return validateRows() && validateColumns() && validateSquares();

    function validateRows() {
        for (let i = 0; i < 9; i++) {
            let usedNums = {};

            for (let j = 0; j < 9; j++) {
                const current = board[i][j];
                if (current === '.') continue;
    
                if (usedNums[current]) return false;
                usedNums[current] = 1;
            }
        }

        return true;
    }

    function validateColumns() {
        for (let j = 0; j < 9; j++) {
            let usedNums = {};

            for (let i = 0; i < 9; i++) {
                const current = board[i][j];
                if (current === '.') continue;
    
                if (usedNums[current]) return false;
                usedNums[current] = 1;
            }
        }

        return true;
    }

    function validateSquares() {
        for (let squareI = 0; squareI < 3; squareI++) {
            for (let squareJ = 0; squareJ < 3; squareJ++) {
                let usedNums = {};

                for (let i = squareI * 3; i < squareI * 3 + 3; i++) {
                    for (let j = squareJ * 3; j < squareJ * 3 + 3; j++) {
                        const current = board[i][j];
                        if (current === '.') continue;
        
                        if (usedNums[current]) return false;
                        usedNums[current] = 1;
                    }
                }
            }
        }

        return true;
    }
}