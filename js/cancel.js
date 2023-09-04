export {cancel};

function cancel(sudoku, stack, board, validateNum, highlight) {
    const initialBoard = stack.pop();
    const currentBoard = JSON.parse(localStorage.getItem('currentBoard'));
    if (initialBoard) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const num = initialBoard[i][j];
                if (currentBoard[i][j] === num) continue;
                
                board[i][j] = num;

                const cell = sudoku.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                cell.textContent = num === '.' ? '' : num;
                cell.dataset.num = num;
                cell.classList.remove('sudoku__item_note');
                highlight(cell);

                const isValid = validateNum(currentBoard, num, [i, j]);   

                cell.classList.remove('wrong');
                if (!isValid) cell.classList.add('wrong');

                localStorage.setItem('currentBoard', JSON.stringify(board));
            }
        }     
    }
}