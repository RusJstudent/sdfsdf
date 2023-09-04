export {getCurrentBoard};

function getCurrentBoard(sudoku, initialBoard, validateNum) {
    const currentBoard = JSON.parse(localStorage.getItem('currentBoard'));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const num = currentBoard[i][j];
            if (initialBoard[i][j] !== '.' || num === '.') continue;

            initialBoard[i][j] = num;
            const cell = sudoku.querySelector(`[data-row="${i}"][data-col="${j}"]`);
            cell.textContent = num;

            const isValid = validateNum(currentBoard, num, [i, j]);          
            if (!isValid) {
                cell.classList.add('wrong');
            }
        }
    }
}