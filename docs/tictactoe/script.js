const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');
let currentPlayer = 'X';
let cells = Array(9).fill(null);
let gameOver = false;

function createBoard() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.index = index;
        div.addEventListener('click', handleMove);
        div.textContent = cell ? cell : '';
        board.appendChild(div);
    });
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function handleMove(e) {
    const index = e.target.dataset.index;
    if (cells[index] || gameOver) return;

    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
    } else if (cells.every(cell => cell)) {
        message.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[b] === cells[c];
    });
}

resetBtn.addEventListener('click', () => {
    cells = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    createBoard();
});

createBoard();
