export function updateScoreBoard(username, points) {
  const nameSpan = document.getElementById('user-name');
  const pointsSpan = document.getElementById('user-points');

  if (nameSpan) nameSpan.textContent = username;
  if (pointsSpan) pointsSpan.textContent = points.toString();
}
