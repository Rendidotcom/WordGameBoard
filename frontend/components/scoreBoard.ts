interface PlayerScore {
    name: string;
    score: number;
  }
  
  /**
   * Mengelola dan menampilkan papan skor.
   */
  export class ScoreBoard {
    private scores: PlayerScore[] = [];
  
    /**
     * Menambahkan pemain dan skor baru ke papan skor.
     * @param name Nama pemain
     * @param score Skor pemain
     */
    addScore(name: string, score: number): void {
      const player: PlayerScore = { name, score };
      this.scores.push(player);
    }
  
    /**
     * Menampilkan semua skor pemain di konsol atau UI.
     */
    displayScores(): void {
      console.log('Papan Skor:');
      this.scores.forEach(player => {
        console.log(`${player.name}: ${player.score} poin`);
      });
    }
  
    /**
     * Mengupdate skor pemain yang sudah ada.
     * @param name Nama pemain
     * @param newScore Skor terbaru
     */
    updateScore(name: string, newScore: number): void {
      const player = this.scores.find(p => p.name === name);
      if (player) {
        player.score = newScore;
      } else {
        console.log('Pemain tidak ditemukan');
      }
    }
  
    /**
     * Mengambil skor pemain berdasarkan nama.
     * @param name Nama pemain
     * @returns Skor pemain atau null jika pemain tidak ditemukan
     */
    getScore(name: string): number | null {
      const player = this.scores.find(p => p.name === name);
      return player ? player.score : null;
    }
  }
  