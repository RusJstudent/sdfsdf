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

let difficulty = complexities.querySelector('.complexity__item.active').dataset.complexity;

generateSudoku();
function generateSudoku() {
    let board = createEmptyBoard();
    solveSudoku(board);
    swap(board, 15);
    removeElems(board, DIFFICULTIES[difficulty].cells, DIFFICULTIES[difficulty].k);
    render(board, sudoku);
}