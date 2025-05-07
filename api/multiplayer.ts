import { supabase } from './supabaseClient';

let currentRoomId: string | undefined = undefined;
let currentUserId: string = '';
let username: string = '';

// Ambil data user dari session
async function initUser(): Promise<boolean> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    alert('Please login first');
    return false;
  }

  currentUserId = data.user.id;

  const { data: profile } = await supabase
    .from('ProfileScores')
    .select('username')
    .eq('id', currentUserId)
    .single();

  username = profile?.username || 'Unknown';
  return true;
}

// Create new room
export async function createRoom(): Promise<string | undefined> {
  const ok = await initUser();
  if (!ok) return;

  const code = Math.random().toString(36).substring(2, 7).toUpperCase();
  const { data, error } = await supabase
    .from('Rooms')
    .insert([{ code }])
    .select()
    .single();

  if (error) {
    console.error('Failed to create room:', error);
    return;
  }

  currentRoomId = data.id;
  await joinRoom(code);
  return code;
}

// Join existing room
export async function joinRoom(code: string): Promise<string | undefined> {
  const ok = await initUser();
  if (!ok) return;

  const { data: room, error: roomError } = await supabase
    .from('Rooms')
    .select('id')
    .eq('code', code)
    .single();

  if (roomError || !room) {
    alert('Room not found.');
    return;
  }

  currentRoomId = room.id;

  await supabase.from('RoomPlayers').upsert([
    { room_id: currentRoomId, user_id: currentUserId, username, points: 0 }
  ]);

  document.getElementById('room-name')!.textContent = code;
  document.getElementById('multiplayer-setup')?.classList.add('hidden');
  document.getElementById('multiplayer-room')?.classList.remove('hidden');

  subscribeToRoomUpdates();
  return code;
}

// Submit a word
export async function submitWordMultiplayer(word: string) {
  if (!currentRoomId || !currentUserId) return;

  const { error } = await supabase.from('RoomWords').insert([{
    room_id: currentRoomId,
    word,
    user_id: currentUserId,
    points: word.length
  }]);

  if (error) console.error('Submit error:', error);
}

// Real-time update listener
function subscribeToRoomUpdates() {
  if (!currentRoomId) return;

  supabase
    .channel(`room-${currentRoomId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'RoomWords',
        filter: `room_id=eq.${currentRoomId}`
      },
      (payload) => {
        const newWord = payload.new.word;
        const user = payload.new.user_id;
        const points = payload.new.points;

        const li = document.createElement('li');
        li.textContent = `${user}: ${newWord} (+${points})`;
        document.getElementById('multi-word-list')?.appendChild(li);
      }
    )
    .subscribe();

  supabase
    .channel(`players-${currentRoomId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'RoomPlayers',
        filter: `room_id=eq.${currentRoomId}`
      },
      () => loadPlayers()
    )
    .subscribe();
}

// Load player list
async function loadPlayers() {
  if (!currentRoomId) return;

  const { data, error } = await supabase
    .from('RoomPlayers')
    .select('username, points')
    .eq('room_id', currentRoomId);

  if (error) {
    console.error('Load players failed:', error);
    return;
  }

  const list = document.getElementById('player-list');
  if (list) {
    list.innerHTML = '';
    data.forEach((p) => {
      const li = document.createElement('li');
      li.textContent = `${p.username} (${p.points} pts)`;
      list.appendChild(li);
    });
  }
}
