export {render};

function render(board, table) {
    table.innerHTML = '';
    const tBody = document.createElement('tbody');
    table.append(tBody);
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        tBody.append(row);
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            cell.classList.add('cell');
            row.append(cell);
            if (board[i][j] === '.') {
                cell.setAttribute('contenteditable', true);
                cell.classList.add('edit');
            } else {
                cell.textContent = board[i][j];
            }
        }
    }
}