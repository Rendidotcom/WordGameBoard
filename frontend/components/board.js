/**
 * Mengelola dan memperbarui papan permainan dengan huruf-huruf yang diketik oleh pemain.
 * Menyimpan posisi huruf di grid dan mengupdate tampilan papan permainan.
 */

export function createBoard(rows = 6, cols = 5) {
    const board = document.getElementById("game-board");
    board.innerHTML = ''; // Clear board
  
    // Membuat grid kosong untuk papan permainan
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.contentEditable = true;
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.addEventListener("input", handleInputChange);
        board.appendChild(cell);
      }
    }
  }
  
  /**
   * Menangani perubahan input (huruf yang diketik) pada setiap cell
   */
  function handleInputChange(event) {
    const cell = event.target;
    const inputText = cell.innerText.trim().toUpperCase(); // memastikan huruf kapital
  
    if (inputText.length > 1) {
      // Jika lebih dari 1 karakter, ambil hanya karakter pertama
      cell.innerText = inputText[0];
    } else {
      // Update posisi huruf di dalam grid
      cell.innerText = inputText;
    }
  
    // Menandai jika ada kata valid saat mengetik (opsional, untuk sistem validasi)
    validateWordInGrid();
  }
  
  /**
   * Mengambil kata vertikal dari grid, dan memvalidasi apakah kata tersebut valid
   * Ini mengakses kolom-kolom dan mencari kata vertikal di grid
   */
  function validateWordInGrid() {
    const grid = document.querySelectorAll('.cell');
    const cols = 5;  // Ganti sesuai jumlah kolom grid
    const rows = 6;  // Ganti sesuai jumlah baris grid
  
    let words = [];
  
    // Mengambil kata vertikal dari setiap kolom
    for (let col = 0; col < cols; col++) {
      let word = '';
      for (let row = 0; row < rows; row++) {
        const cell = grid[row * cols + col];
        word += cell.innerText.trim().toUpperCase();
      }
      if (word.length >= 2) { // Validasi panjang kata minimal 2 karakter
        words.push(word);
      }
    }
  
    // Debug: Tampilkan kata-kata vertikal
    console.log('Kata-kata vertikal: ', words);
  
    // Cek validitas kata vertikal menggunakan API kamus (opsional)
    // bisa dipanggil untuk validasi kata-kata di grid
    checkValidWords(words);
  }
  
  /**
   * Fungsi untuk validasi kata dengan kamus (menggunakan dictionaryValidation.js)
   * Menampilkan hasil validasi (bisa digunakan untuk memperbarui skor)
   */
  async function checkValidWords(words) {
    for (const word of words) {
      const isValid = await isValidEnglishWord(word);
      if (isValid) {
        console.log(`${word} adalah kata valid.`);
        // Tambahkan poin atau aksi sesuai validasi (misalnya update skor)
      } else {
        console.log(`${word} bukan kata valid.`);
      }
    }
  }
  