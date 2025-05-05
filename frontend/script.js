const API = {
  register: '/api/register',
  login: '/api/login',
  updateScore: '/api/points/update'
};

const authDiv = document.getElementById('auth');
const gameDiv = document.getElementById('game');
const uname = document.getElementById('user-name');
const upoints = document.getElementById('user-points');
const wlist = document.getElementById('word-list');
const wordInput = document.getElementById('word-input');

let currentUser = null;

async function register() {
  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-pass').value;

  if (!username || !email || !password) {
    alert('All fields are required for registration.');
    return;
  }

  try {
    const res = await fetch(API.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.message || 'Registration successful. Please log in.');
  } catch (error) {
    alert('Registration failed. Please try again.');
    console.error(error);
  }
}

async function login() {
  const email = document.getElementById('log-email').value.trim();
  const password = document.getElementById('log-pass').value;

  if (!email || !password) {
    alert('Please enter email and password.');
    return;
  }

  try {
    const res = await fetch(API.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const json = await res.json();

    if (res.ok) {
      currentUser = json.user;
      startGame();
    } else {
      alert(json.error || 'Login failed.');
    }
  } catch (error) {
    alert('Login failed. Please try again.');
    console.error(error);
  }
}

function startGame() {
  authDiv.classList.add('hidden');
  gameDiv.classList.remove('hidden');
  uname.textContent = currentUser.username;
  upoints.textContent = currentUser.points?.toString() || '0';

  initBoard();
}

function initBoard(rows = 5, cols = 5) {
  const board = document.getElementById('board-container');
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${cols}, 40px)`;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.maxLength = 1;
      cell.className = 'board-cell';
      board.appendChild(cell);
    }
  }
}

async function validateWord(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.ok;
  } catch {
    return false;
  }
}

async function updateScore() {
  if (!currentUser) return;

  const word = wordInput.value.trim().toLowerCase();
  if (!word) {
    alert('Please enter a word.');
    return;
  }

  const isValid = await validateWord(word);
  if (!isValid) {
    alert('Invalid word!');
    return;
  }

  const points = word.length;

  try {
    const res = await fetch(API.updateScore, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, points })
    });

    const data = await res.json();

    if (res.ok) {
      currentUser.points += points;
      upoints.textContent = currentUser.points.toString();

      const li = document.createElement('li');
      li.textContent = `✅ ${word} (+${points} pts)`;
      wlist.appendChild(li);
      wordInput.value = '';
    } else {
      alert(data.error || 'Failed to update score');
    }
  } catch (error) {
    alert('Error updating score.');
    console.error(error);
  }
}

// Event Listeners
document.getElementById('btn-register').addEventListener('click', register);
document.getElementById('btn-login').addEventListener('click', login);
document.getElementById('btn-submit').addEventListener('click', updateScore);
