export function updateScoreBoard(players, currentTurnIndex) {
    const scoreBoard = document.getElementById("score-board");
    scoreBoard.innerHTML = "<h3>Skor</h3>";
  
    players.forEach((player, index) => {
      const line = document.createElement("div");
      line.textContent = `${player.name}: ${player.score} ${index === currentTurnIndex ? "(🟢 giliran)" : ""}`;
      scoreBoard.appendChild(line);
    });
  }
  