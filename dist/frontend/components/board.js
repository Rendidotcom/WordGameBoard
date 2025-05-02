// frontend/components/board.js
export function renderBoard(containerId = 'game-board') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Element with id "${containerId}" not found`);
        return;
    }

    const rows = 6;
    const cols = 5;

    const table = document.createElement('table');
    table.classList.add('board');

    for (let r = 0; r < rows; r++) {
        const row = document.createElement('tr');
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('td');
            cell.classList.add('cell');
            cell.setAttribute('data-row', r);
            cell.setAttribute('data-col', c);
            cell.textContent = ''; // Kosong dulu, akan diisi huruf saat main
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    container.innerHTML = ''; // Kosongkan isi lama
    container.appendChild(table);
}
