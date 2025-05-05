// multiplayer.js
import { db } from './firebase'; // Import Firebase database

const gameRoomRef = db.collection('gameRooms'); // Referensi ke koleksi room game

// Membuat ruang permainan baru
export const createRoom = async (roomName, user) => {
  const newRoom = {
    name: roomName,
    players: [user],
    currentTurn: user.uid, // Giliran pemain pertama
    scores: { [user.uid]: 0 },
    status: 'waiting', // status bisa 'waiting' atau 'playing'
  };
  
  const roomRef = await gameRoomRef.add(newRoom);
  return roomRef.id; // ID untuk room yang baru dibuat
};

// Bergabung ke ruang yang sudah ada
export const joinRoom = async (roomId, user) => {
  const roomRef = gameRoomRef.doc(roomId);
  const roomDoc = await roomRef.get();

  if (roomDoc.exists) {
    const roomData = roomDoc.data();

    // Tambahkan pemain ke room
    roomData.players.push(user);
    await roomRef.update({ players: roomData.players });

    return roomRef.id; // ID ruang yang berhasil bergabung
  }
  
  return null; // Jika room tidak ditemukan
};

// Sinkronisasi status permainan dan giliran
export const listenToRoom = (roomId, callback) => {
  const roomRef = gameRoomRef.doc(roomId);
  
  roomRef.onSnapshot((snapshot) => {
    const roomData = snapshot.data();
    callback(roomData); // Mengirim data terbaru ke callback
  });
};

// Update skor atau status permainan
export const updateGameStatus = async (roomId, updates) => {
  const roomRef = gameRoomRef.doc(roomId);
  await roomRef.update(updates);
};
