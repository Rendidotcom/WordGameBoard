"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function register() {
    return __awaiter(this, void 0, void 0, function* () {
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-pass').value;
        const res = yield fetch(API.register, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = yield res.json();
        alert(data.message || 'Registration successful');
    });
}
// Fungsi untuk login pengguna
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        const email = document.getElementById('log-email').value;
        const password = document.getElementById('log-pass').value;
        const res = yield fetch(API.login, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const json = yield res.json();
        if (res.ok) {
            currentUser = json.user;
            startGame();
        }
        else {
            alert(json.error || 'Login failed');
        }
    });
}
// Fungsi untuk memulai permainan setelah login
function startGame() {
    authDiv.classList.add('hidden');
    gameDiv.classList.remove('hidden');
    uname.textContent = currentUser.username;
    upoints.textContent = currentUser.points.toString();
}
// Fungsi untuk memvalidasi kata menggunakan API kamus
function validateWord(word) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return response.ok; // Jika status OK, kata valid
    });
}
// Fungsi untuk memperbarui skor pemain
function updateScore() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!currentUser)
            return;
        const word = wordInput.value.trim();
        if (word && (yield validateWord(word))) {
            const points = word.length; // Skor dihitung berdasarkan panjang kata
            // Update user points di server
            const res = yield fetch(API.updateScore, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id, points })
            });
            const data = yield res.json();
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
    });
}
// Event listener untuk tombol register
document.getElementById('btn-register').addEventListener('click', register);
// Event listener untuk tombol login
document.getElementById('btn-login').addEventListener('click', login);
// Event listener untuk tombol submit kata
document.getElementById('btn-submit').addEventListener('click', updateScore);
