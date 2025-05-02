// components/scoreBoard.js
export function updateScoreBoard(username, points) {
  const uname = document.getElementById('user-name');
  const upoints = document.getElementById('user-points');

  if (uname && upoints) {
    uname.textContent = username;
    upoints.textContent = points.toString();
  }
}
