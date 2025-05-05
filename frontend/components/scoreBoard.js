// components/scoreBoard.js

/**
 * Update scoreboard UI with the given username and points.
 * @param {string} username - The user's name to display.
 * @param {number} points - The user's score to display.
 */
export function updateScoreBoard(username, points) {
  const uname = document.getElementById('user-name');
  const upoints = document.getElementById('user-points');

  if (!uname || !upoints) {
    console.warn('Scoreboard elements not found in the DOM.');
    return;
  }

  uname.textContent = username;
  upoints.textContent = String(points);
}
