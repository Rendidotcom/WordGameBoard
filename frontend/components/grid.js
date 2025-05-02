export function createGrid(rows = 6, cols = 5) {
    const board = document.getElementById("game-board");
    board.innerHTML = ''; // Clear board
  
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.contentEditable = true;
        cell.dataset.row = r;
        cell.dataset.col = c;
        board.appendChild(cell);
      }
    }
  }
  