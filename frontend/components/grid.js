export function createGrid(rows, cols) {
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  grid.style.gap = '5px';

  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.style.width = '30px';
    cell.style.height = '30px';
    cell.style.border = '1px solid #ccc';
    grid.appendChild(cell);
  }

  return grid;
}
