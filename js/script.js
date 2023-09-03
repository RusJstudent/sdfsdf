import {createEmptyBoard} from './createEmptyBoard.js';
import {solveSudoku} from './solveSudoku.js';
import {swap} from './swap.js';
import {removeElems} from './removeElems.js';
import {render} from './render.js';
// import {validateSudoku, isValidNum} from './validate.js';
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

let activeCell = null;

generateSudoku();

complexities.addEventListener('click', changeDifficulty);
sudoku.addEventListener('click', highlight);

function generateSudoku() {
    const difficulty = complexities.querySelector('.complexity__item.active').dataset.complexity;
    let board = createEmptyBoard();
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

function highlight(e) {
    const cell = e.target.closest('.sudoku__item');
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