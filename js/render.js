export {render};

function render(board, sudoku) {
    sudoku.innerHTML = '';
    for (let k = 0; k < 9; k++) {
        const square = document.createElement('div');
        square.classList.add('sudoku__square');
        sudoku.append(square);

        const startRow = Math.floor(k / 3) * 3;
        const startCol = k * 3 % 9;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('sudoku__item');
                cell.dataset.square = k;
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.dataset.num = board[i][j];
                board[i][j] === '.' ? cell.classList.add('editable') : cell.textContent = board[i][j];
                square.append(cell);
            }
        }
    }
}