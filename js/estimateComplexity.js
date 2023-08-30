export {estimateComplexity};

function estimateComplexity(cells, k, difficulty) {
    const complexities = ['Очень легко', 'Легко', 'Нормально', 'Сложно', 'Очень сложно', 'Невозможно'];
    let complexity = 0;

    cells = +cells;
    k = +k;

    if (k === 3 && cells <= 38 || k === 2 && cells <= 39 || k === 1 && cells <= 40 || k === 0 && cells <= 41) {
        complexity = 1;
    }
    
    if (k === 3 && cells <= 30 || k === 2 && cells <= 32 || k === 1 && cells <= 33 || k === 0 && cells <= 34) {
        complexity = 2;
    }
    
    if (k === 2 && cells <= 23 || k === 1 && cells <= 27 || k === 0 && cells <= 28) {
        complexity = 3;
    }

    if (k === 1 && cells <= 20 || k === 0 && cells <= 23) {
        complexity = 4;
    }
    
    if (k === 1 && cells <= 14 || k === 0 && cells <= 16) {
        complexity = 5;
    }

    difficulty.textContent = complexities[complexity];
    // 0 - 0 | 1 - 10 | 2 - 19 | 3 - 28 | 4 - 37 | 5 - 46 Средний минимум заполненных ячеек при заданном k
}