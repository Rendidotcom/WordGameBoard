/**
 * Membuat grid kosong dengan ukuran yang ditentukan.
 * Menggunakan baris dan kolom untuk menginisialisasi grid.
 */
export function createGrid(rows: number, cols: number): HTMLElement[] {
    const grid: HTMLElement[] = [];
    
    // Membuat grid kosong
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.contentEditable = 'true';
        cell.dataset.row = r.toString();
        cell.dataset.col = c.toString();
        grid.push(cell);
      }
    }
  
    return grid;
  }
  