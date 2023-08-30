import {createEmptyBoard} from './createEmptyBoard.js';
import {solveSudoku} from './solveSudoku.js';
import {swap} from './swap.js';
import {removeElems} from './removeElems.js';
import {validateSudoku, isValidNum} from './validate.js';
import {render} from './render.js';
import {estimateComplexity} from './estimateComplexity.js';


const table = document.getElementById('sudoku');
const generateButton = document.getElementById('generate');
const cells = document.querySelector('input[name="cells"]');
const k = document.querySelector('input[name="k"]');
const difficulty = document.querySelector('.difficulty');

generateButton.onclick = generateSudoku;
cells.oninput = k.oninput = monitorInputs;
table.addEventListener('input', function(e) {
    const value = e.target.textContent;
    if (isNaN(value)) {
        e.target.textContent = '';
    } else if (value.includes('0')) {
        e.target.textContent = '';
    } else if (value.length > 1) {
        e.target.textContent = e.data;
    }
});

generateSudoku();
function generateSudoku() {
    let board = createEmptyBoard();
    solveSudoku(board);
    swap(board, 15);
    removeElems(board, cells.value, k.value);
    render(board, table);
    estimateComplexity(cells.value, k.value, difficulty)
}

function monitorInputs(e) {
    const name = e.target.name;
    
    if (name === 'cells') {
        if (e.target.value < 0 || e.target.value === '') {
            e.target.value = 0;
        } else if (e.target.value > 81) {
            e.target.value = 81;
        } else if (!(e.target.value >= 1) && !(e.target.value <= 81)) {
            e.target.value = 30;
        }
    }

    if (name === 'k') {
        if (e.target.value < 0 || e.target.value === '') {
            e.target.value = 0;
        } else if (e.target.value > 9) {
            e.target.value = 9;
        } else if (!(e.target.value >= 0) && !(e.target.value <= 9)) {
            e.target.value = 2;
        }
    }
}