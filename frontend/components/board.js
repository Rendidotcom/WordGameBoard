// components/board.js

let board = [];

export function initBoard(containerId, rows = 6, cols = 5) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  board = [];

  for (let r = 0; r < rows; r++) {
    const row = [];
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('board-row');

    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('input');
      cell.classList.add('board-cell');
      cell.setAttribute('maxlength', '1');
      cell.dataset.row = r.toString();
      cell.dataset.col = c.toString();
      rowDiv.appendChild(cell);
      row.push(cell);
    }

    container.appendChild(rowDiv);
    board.push(row);
  }
}

export function getVerticalWords() {
  const words = [];
  const rows = board.length;
  const cols = board[0]?.length || 0;

  for (let c = 0; c < cols; c++) {
    let word = '';
    for (let r = 0; r < rows; r++) {
      const letter = board[r][c].value.trim().toUpperCase();
      if (letter) word += letter;
    }
    if (word.length >= 2) words.push(word);
  }

  return words;
}

export async function validateVerticalWords() {
  const words = getVerticalWords();

  for (const word of words) {
    const isValid = await isValidEnglishWord(word);
    if (isValid) {
      console.log(`${word} ✅ valid`);
      // Optional: beri skor, warna hijau, dsb
    } else {
      console.log(`${word} ❌ invalid`);
      // Optional: beri tanda merah, dsb
    }
  }
}

async function isValidEnglishWord(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return res.ok;
  } catch (e) {
    console.error(`Error checking word ${word}:`, e);
    return false;
  }
}
