/**
 * Update scoreboard UI with the given username and points.
 * @param {string} username - The user's name to display.
 * @param {number} points - The user's score to display.
 */
export function updateScoreBoard(username, points) {
  // Pastikan DOM sudah siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () =>
      applyScoreToDOM(username, points)
    );
  } else {
    applyScoreToDOM(username, points);
  }
}

/**
 * Helper to actually update DOM elements once they're available
 */
function applyScoreToDOM(username, points) {
  const uname = document.getElementById('userName');
  const upoints = document.getElementById('user-points');

  if (!uname || !upoints) {
    console.warn('⚠️ Scoreboard elements not found in the DOM.');
    return;
  }

  uname.textContent = username;
  upoints.textContent = String(points);
}
