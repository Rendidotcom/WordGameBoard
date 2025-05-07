"use strict";
const API = {
    register: '/api/register',
    login: '/api/login',
    updateScore: '/api/points/update' // Endpoint untuk memperbarui skor
};
const authDiv = document.getElementById('auth');
const gameDiv = document.getElementById('game');
const uname = document.getElementById('user-name');
const upoints = document.getElementById('user-points');
const wlist = document.getElementById('word-list');
const wordInput = document.getElementById('word-input');
let currentUser = null;
// Fungsi untuk registrasi pengguna baru
async function register() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-pass').value;
    const res = await fetch(API.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    alert(data.message || 'Registration successful');
}
// Fungsi untuk login pengguna
async function login() {
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-pass').value;
    const res = await fetch(API.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if (res.ok) {
        currentUser = json.user;
        startGame();
    }
    else {
        alert(json.error || 'Login failed');
    }
}
// Fungsi untuk memulai permainan setelah login
function startGame() {
    authDiv.classList.add('hidden');
    gameDiv.classList.remove('hidden');
    uname.textContent = currentUser.username;
    upoints.textContent = currentUser.points.toString();
}
// Fungsi untuk memvalidasi kata menggunakan API kamus
async function validateWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.ok; // Jika status OK, kata valid
}
// Fungsi untuk memperbarui skor pemain
async function updateScore() {
    if (!currentUser)
        return;
    const word = wordInput.value.trim();
    if (word && await validateWord(word)) {
        const points = word.length; // Skor dihitung berdasarkan panjang kata
        // Update user points di server
        const res = await fetch(API.updateScore, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser.id, points })
        });
        const data = await res.json();
        if (res.ok) {
            currentUser.points += points; // Menambahkan poin ke skor pemain
            upoints.textContent = currentUser.points.toString();
            const li = document.createElement('li');
            li.textContent = `Word: ${word} | +${points} Points`;
            wlist.appendChild(li);
        }
        else {
            alert('Failed to update score');
        }
    }
    else {
        alert('Invalid word!');
    }
}
// Event listener untuk tombol register
document.getElementById('btn-register').addEventListener('click', register);
// Event listener untuk tombol login
document.getElementById('btn-login').addEventListener('click', login);
// Event listener untuk tombol submit kata
document.getElementById('btn-submit').addEventListener('click', updateScore);
