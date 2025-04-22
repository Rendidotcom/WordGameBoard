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
};
const authDiv = document.getElementById('auth');
const gameDiv = document.getElementById('game');
const uname = document.getElementById('user-name');
const upoints = document.getElementById('user-points');
const wlist = document.getElementById('word-list');
let currentUser = null;
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
        alert((yield res.json()).message || 'Done');
    });
}
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
function startGame() {
    authDiv.classList.add('hidden');
    gameDiv.classList.remove('hidden');
    uname.textContent = currentUser.username;
    upoints.textContent = currentUser.points.toString();
}
function submitWord() {
    const word = document.getElementById('word-input').value;
    const li = document.createElement('li');
    li.textContent = word;
    wlist.appendChild(li);
    // belum update poin—bisa ditambahkan endpoint points/update nanti
}
document.getElementById('btn-register').addEventListener('click', register);
document.getElementById('btn-login').addEventListener('click', login);
document.getElementById('btn-submit').addEventListener('click', submitWord);
