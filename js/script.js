import {createEmptyBoard} from './createEmptyBoard.js';
import {solveSudoku} from './solveSudoku.js';
import {swap} from './swap.js';
import {removeElems} from './removeElems.js';
import {render} from './render.js';
import {validateSudoku, validateNum} from './validate.js';
// import {estimateComplexity} from './estimateComplexity.js';

const DIFFICULTIES = {
    easy: {
        cells: 40,
        k: 3,
    },
    normal: {
        cells: 27,
        k: 2,
    },
    hard: {
        cells: 20,
        k: 1,
    },
}

const complexities = document.querySelector('.complexity');
const sudoku = document.querySelector('.sudoku');
const undo = document.querySelector('.tools__undo');
const erase = document.querySelector('.tools__erase');
const edit = document.querySelector('.tools__edit');
const numbers = document.querySelector('.numbers');

let board;
let activeCell = null;
let isEditing = false;

generateSudoku();

complexities.addEventListener('click', changeDifficulty);
sudoku.addEventListener('click', e => highlight(e.target.closest('.sudoku__item')));
numbers.addEventListener('click', pickNum);
erase.addEventListener('click', clearCell);

function generateSudoku() {
    const difficulty = complexities.querySelector('.complexity__item.active').dataset.complexity;
    board = createEmptyBoard();
    solveSudoku(board);
    swap(board, 20);
    removeElems(board, DIFFICULTIES[difficulty].cells, DIFFICULTIES[difficulty].k);
    render(board, sudoku);
}

function changeDifficulty(e) {
    if (!e.target.classList.contains('complexity__item')) return;

    const restart = confirm(`Start new game on level ${e.target.dataset.complexity}?`);

    if (restart) {
        complexities.querySelector('.complexity__item.active').classList.remove('active');
        e.target.classList.add('active');
        generateSudoku();
    }
}

function highlight(cell) {
    if (!cell) return;

    if (activeCell) activeCell.classList.remove('active');
    cell.classList.add('active');
    activeCell = cell;

    document.querySelectorAll('.sudoku__item.highlight')
        .forEach(item => item.classList.remove('highlight'));
    
    const num = cell.dataset.num === '.' ? null : cell.dataset.num;
    const square = cell.dataset.square;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    document.querySelectorAll(`.sudoku__item[data-num="${num}"], 
        .sudoku__item[data-square="${square}"], 
        .sudoku__item[data-row="${row}"], 
        .sudoku__item[data-col="${col}"]`)
            .forEach(item => item.classList.add('highlight'));
}

function pickNum(e) {
    if (!e.target.classList.contains('numbers__item')) return;
    if (!activeCell || !activeCell.classList.contains('edit')) return;

    activeCell.classList.remove('wrong');

    const num = e.target.dataset.number;

    if (!isEditing) {
        activeCell.dataset.num = num;
        activeCell.textContent = num;

        const [i, j] = [+activeCell.dataset.row, +activeCell.dataset.col];

        let isValid = validateNum(board, num, [i, j]);

        board[i][j] = num;

        if (!isValid) {
            activeCell.classList.add('wrong');

            // получить ячейки, из-за которых невалидное значение и подсветить красным
        }

        highlight(activeCell);
    }
}

function clearCell(e) {
    if (!activeCell || !activeCell.classList.contains('edit')) return;

    const [i, j] = [+activeCell.dataset.row, +activeCell.dataset.col];
    board[i][j] = '.';
    activeCell.dataset.num = '.';
    activeCell.innerHTML = '';
    highlight(activeCell);
}