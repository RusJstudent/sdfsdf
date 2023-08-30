export {validateSudoku, isValidNum};

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

function isValidNum(board, num, cords) { // isValidNum(input, '9', [0, 8])
    const [i, j] = cords;

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

    return !usedNums.has(num);
}