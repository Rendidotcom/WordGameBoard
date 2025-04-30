var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API = {
    register: '/api/register',
    login: '/api/login',
    updateScore: '/api/points/update' // Endpoint untuk memperbarui skor
};
var authDiv = document.getElementById('auth');
var gameDiv = document.getElementById('game');
var uname = document.getElementById('user-name');
var upoints = document.getElementById('user-points');
var wlist = document.getElementById('word-list');
var wordInput = document.getElementById('word-input');
var currentUser = null;
// Fungsi untuk registrasi pengguna baru
function register() {
    return __awaiter(this, void 0, void 0, function () {
        var username, email, password, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = document.getElementById('reg-username').value;
                    email = document.getElementById('reg-email').value;
                    password = document.getElementById('reg-pass').value;
                    return [4 /*yield*/, fetch(API.register, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ username: username, email: email, password: password })
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    alert(data.message || 'Registration successful');
                    return [2 /*return*/];
            }
        });
    });
}
// Fungsi untuk login pengguna
function login() {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, res, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = document.getElementById('log-email').value;
                    password = document.getElementById('log-pass').value;
                    return [4 /*yield*/, fetch(API.login, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email, password: password })
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    json = _a.sent();
                    if (res.ok) {
                        currentUser = json.user;
                        startGame();
                    }
                    else {
                        alert(json.error || 'Login failed');
                    }
                    return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.dictionaryapi.dev/api/v2/entries/en/".concat(word))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.ok]; // Jika status OK, kata valid
            }
        });
    });
}
// Fungsi untuk memperbarui skor pemain
function updateScore() {
    return __awaiter(this, void 0, void 0, function () {
        var word, _a, points, res, data, li;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!currentUser)
                        return [2 /*return*/];
                    word = wordInput.value.trim();
                    _a = word;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, validateWord(word)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    if (!_a) return [3 /*break*/, 5];
                    points = word.length;
                    return [4 /*yield*/, fetch(API.updateScore, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId: currentUser.id, points: points })
                        })];
                case 3:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 4:
                    data = _b.sent();
                    if (res.ok) {
                        currentUser.points += points; // Menambahkan poin ke skor pemain
                        upoints.textContent = currentUser.points.toString();
                        li = document.createElement('li');
                        li.textContent = "Word: ".concat(word, " | +").concat(points, " Points");
                        wlist.appendChild(li);
                    }
                    else {
                        alert('Failed to update score');
                    }
                    return [3 /*break*/, 6];
                case 5:
                    alert('Invalid word!');
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Event listener untuk tombol register
document.getElementById('btn-register').addEventListener('click', register);
// Event listener untuk tombol login
document.getElementById('btn-login').addEventListener('click', login);
// Event listener untuk tombol submit kata
document.getElementById('btn-submit').addEventListener('click', updateScore);
