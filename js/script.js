import {createEmptyBoard} from './createEmptyBoard.js';
import {solveSudoku} from './solveSudoku.js';
import {swap} from './swap.js';
import {removeElems} from './removeElems.js';
import {render} from './render.js';
import {validateNum} from './validateNum.js';
import {getIntersectedCells} from './getIntersectedCells.js';
import {isSolved} from './isSolved.js';
// import {estimateComplexity} from './estimateComplexity.js';

const DIFFICULTIES = {
    easy: {
        cells: 40,
        k: 3,
    },
    normal: {
        cells: 30,
        k: 2,
    },
    hard: {
        cells: 22,
        k: 1,
    },
}

const complexities = document.querySelector('.complexity');
const sudoku = document.querySelector('.sudoku');
const mistakesCounter = document.querySelector('.info__counter');
const timer = document.querySelector('.info__timer');
const undo = document.querySelector('.tools__undo');
const erase = document.querySelector('.tools__erase');
const edit = document.querySelector('.tools__edit');
const numbers = document.querySelector('.numbers');

let board;
let activeCell = null;
let isEditing = false;
let difficulty;
let counter;
let timerId;

generateSudoku();

complexities.addEventListener('click', changeDifficulty);
sudoku.addEventListener('click', e => highlight(e.target.closest('.sudoku__item')));
numbers.addEventListener('click', pickNum);
erase.addEventListener('click', e => activeCell && activeCell.classList.contains('editable') && clearCell(activeCell));
edit.addEventListener('click', editMode);

function generateSudoku() {
    mistakesCounter.textContent = counter = 0;
    timerHandler();
    difficulty = complexities.querySelector('.complexity__item.active').dataset.complexity;
    board = createEmptyBoard();
    solveSudoku(board);
    swap(board, 20);
    removeElems(board, DIFFICULTIES[difficulty].cells, DIFFICULTIES[difficulty].k);
    render(board, sudoku);
}

function timerHandler() {
    clearInterval(timerId);
    let secondsPlaying = 0;
    timer.textContent = format(secondsPlaying);
    timerId = setInterval(() => {
        secondsPlaying++;
        timer.textContent = format(secondsPlaying);
    }, 1000);

    function format(seconds) {
        let str = '';
        let sec = seconds % 60;
        seconds -= sec;
        let min = seconds % 3600 / 60;
        seconds -= min * 60;
    
        if (seconds) {
            let hours = seconds / 3600;
            str += `${hours}:${min}:${sec}`;
        } else {
            str += `${min}:${sec}`;
        }
    
        return str.replace(/\b\d\b/g, '0$&');
    }
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

    sudoku.querySelectorAll('.sudoku__item.highlight, .sudoku__item.intersected')
        .forEach(item => item.classList.remove('highlight', 'intersected'));
    
    const num = cell.dataset.num === '.' ? null : cell.dataset.num;
    const square = cell.dataset.square;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    sudoku.querySelectorAll(`.sudoku__item[data-num="${num}"], 
        .sudoku__item[data-square="${square}"], 
        .sudoku__item[data-row="${row}"], 
        .sudoku__item[data-col="${col}"]`)
            .forEach(item => item.classList.add('highlight'));
}

function pickNum(e) {
    if (!e.target.classList.contains('numbers__item')) return;
    if (!activeCell || !activeCell.classList.contains('editable')) return;

    activeCell.classList.remove('wrong');

    const num = e.target.dataset.number;

    if (!isEditing) {
        if (activeCell.classList.contains('sudoku__item_note')) {
            activeCell.classList.remove('sudoku__item_note');
        }

        activeCell.dataset.num = num;
        activeCell.textContent = num;

        highlight(activeCell);

        const [i, j] = [+activeCell.dataset.row, +activeCell.dataset.col];

        board[i][j] = num;

        let isValid = validateNum(board, num, [i, j]);
        if (isValid) {
            if (isSolved(board)) {
                setTimeout(() => alert(`Congrats! Sudoku level ${difficulty} is finished!`));
            }
            return;
        }

        counter++;
        mistakesCounter.textContent = counter;
        activeCell.classList.add('wrong');

        getIntersectedCells(board, num, [i, j]).forEach(cords => {
            const [i, j] = cords;
            const cell = sudoku.querySelector(`[data-row="${i}"][data-col="${j}"]`);
            cell.classList.add('intersected');
        });
    } else {
        if (activeCell.classList.contains('sudoku__item_note')) {
            const note = activeCell.children[num - 1];
            note.textContent = note.textContent === '' ? num : '';
            return;
        }

        clearCell(activeCell);
        activeCell.classList.add('sudoku__item_note');

        for (let i = 0; i < 9; i++) {
            const note = document.createElement('div');
            note.classList.add('sudoku__note');
            if (+num === i + 1) note.textContent = num;
            activeCell.append(note);
        }
    }
}

function clearCell(activeCell) {
    activeCell.classList.remove('sudoku__item_note');
    const [i, j] = [+activeCell.dataset.row, +activeCell.dataset.col];
    board[i][j] = '.';
    activeCell.dataset.num = '.';
    activeCell.innerHTML = '';
    highlight(activeCell);
}

function editMode(e) {
    isEditing = !isEditing;
    edit.classList.toggle('active');
}