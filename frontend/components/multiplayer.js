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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = createRoom;
exports.joinRoom = joinRoom;
exports.submitWordMultiplayer = submitWordMultiplayer;
var supabaseClient_1 = require("./supabaseClient");
var currentRoomId = null;
var currentUserId = '';
var username = '';
function initUser() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error, _b, profile, profileError;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, supabaseClient_1.supabase.auth.getUser()];
                case 1:
                    _a = _c.sent(), data = _a.data, error = _a.error;
                    if (error || !data.user) {
                        alert('Please login first');
                        return [2 /*return*/, false];
                    }
                    currentUserId = data.user.id;
                    return [4 /*yield*/, supabaseClient_1.supabase
                            .from('ProfileScores')
                            .select('username')
                            .eq('id', currentUserId)
                            .single()];
                case 2:
                    _b = _c.sent(), profile = _b.data, profileError = _b.error;
                    if (profileError || !profile) {
                        alert('Failed to fetch user profile.');
                        return [2 /*return*/, false];
                    }
                    username = profile.username;
                    return [2 /*return*/, true];
            }
        });
    });
}
function createRoom() {
    return __awaiter(this, void 0, void 0, function () {
        var ok, code, _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, initUser()];
                case 1:
                    ok = _b.sent();
                    if (!ok)
                        return [2 /*return*/];
                    code = Math.random().toString(36).substring(2, 7).toUpperCase();
                    return [4 /*yield*/, supabaseClient_1.supabase
                            .from('Rooms')
                            .insert([{ code: code }])
                            .select()
                            .single()];
                case 2:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Failed to create room:', error.message);
                        return [2 /*return*/];
                    }
                    currentRoomId = data.id;
                    return [4 /*yield*/, joinRoom(code)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, code];
            }
        });
    });
}
function joinRoom(code) {
    return __awaiter(this, void 0, void 0, function () {
        var ok, _a, room, roomError;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, initUser()];
                case 1:
                    ok = _d.sent();
                    if (!ok)
                        return [2 /*return*/];
                    return [4 /*yield*/, supabaseClient_1.supabase
                            .from('Rooms')
                            .select('id')
                            .eq('code', code)
                            .single()];
                case 2:
                    _a = _d.sent(), room = _a.data, roomError = _a.error;
                    if (roomError || !room) {
                        alert('Room not found.');
                        return [2 /*return*/];
                    }
                    currentRoomId = room.id;
                    return [4 /*yield*/, supabaseClient_1.supabase.from('RoomPlayers').upsert([
                            {
                                room_id: currentRoomId,
                                user_id: currentUserId,
                                username: username,
                                points: 0,
                            },
                        ])];
                case 3:
                    _d.sent();
                    document.getElementById('room-name').textContent = code;
                    (_b = document.getElementById('multiplayer-setup')) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
                    (_c = document.getElementById('multiplayer-room')) === null || _c === void 0 ? void 0 : _c.classList.remove('hidden');
                    subscribeToRoomUpdates();
                    return [2 /*return*/, code];
            }
        });
    });
}
function submitWordMultiplayer(word) {
    return __awaiter(this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!currentRoomId || !currentUserId)
                        return [2 /*return*/];
                    return [4 /*yield*/, supabaseClient_1.supabase.from('RoomWords').insert([
                            {
                                room_id: currentRoomId,
                                word: word,
                                user_id: currentUserId,
                                points: word.length,
                            },
                        ])];
                case 1:
                    error = (_a.sent()).error;
                    if (error)
                        console.error('Failed to submit word:', error.message);
                    return [2 /*return*/];
            }
        });
    });
}
function subscribeToRoomUpdates() {
    if (!currentRoomId)
        return;
    supabaseClient_1.supabase
        .channel("room-".concat(currentRoomId))
        .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'RoomWords',
        filter: "room_id=eq.".concat(currentRoomId),
    }, function (payload) {
        var _a;
        var newWord = payload.new.word;
        var user = payload.new.username || payload.new.user_id;
        var points = payload.new.points;
        var li = document.createElement('li');
        li.textContent = "".concat(user, ": ").concat(newWord, " (+").concat(points, ")");
        (_a = document.getElementById('multi-word-list')) === null || _a === void 0 ? void 0 : _a.appendChild(li);
    })
        .subscribe();
    supabaseClient_1.supabase
        .channel("players-".concat(currentRoomId))
        .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'RoomPlayers',
        filter: "room_id=eq.".concat(currentRoomId),
    }, function () { return loadPlayers(); })
        .subscribe();
}
function loadPlayers() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error, list;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!currentRoomId)
                        return [2 /*return*/];
                    return [4 /*yield*/, supabaseClient_1.supabase
                            .from('RoomPlayers')
                            .select('username, points')
                            .eq('room_id', currentRoomId)];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Failed to load players:', error.message);
                        return [2 /*return*/];
                    }
                    list = document.getElementById('player-list');
                    if (list) {
                        list.innerHTML = '';
                        data.forEach(function (player) {
                            var li = document.createElement('li');
                            li.textContent = "".concat(player.username, " (").concat(player.points, " pts)");
                            list.appendChild(li);
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
