import { supabase } from './supabaseClient';

let currentRoomId: string | null = null;
let currentUserId: string = '';
let username: string = '';

async function initUser(): Promise<boolean> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    alert('Please login first');
    return false;
  }

  currentUserId = data.user.id;

  const { data: profile, error: profileError } = await supabase
    .from('ProfileScores')
    .select('username')
    .eq('id', currentUserId)
    .single();

  if (profileError || !profile) {
    alert('Failed to fetch user profile.');
    return false;
  }

  username = profile.username;
  return true;
}

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
    console.error('Failed to create room:', error.message);
    return;
  }

  currentRoomId = data.id;
  await joinRoom(code);
  return code;
}

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
    {
      room_id: currentRoomId,
      user_id: currentUserId,
      username,
      points: 0,
    },
  ]);

  document.getElementById('room-name')!.textContent = code;
  document.getElementById('multiplayer-setup')?.classList.add('hidden');
  document.getElementById('multiplayer-room')?.classList.remove('hidden');

  subscribeToRoomUpdates();
  return code;
}

export async function submitWordMultiplayer(word: string) {
  if (!currentRoomId || !currentUserId) return;

  const { error } = await supabase.from('RoomWords').insert([
    {
      room_id: currentRoomId,
      word,
      user_id: currentUserId,
      points: word.length,
    },
  ]);

  if (error) console.error('Failed to submit word:', error.message);
}

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
        filter: `room_id=eq.${currentRoomId}`,
      },
      (payload) => {
        const newWord = payload.new.word;
        const user = payload.new.username || payload.new.user_id;
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
        filter: `room_id=eq.${currentRoomId}`,
      },
      () => loadPlayers()
    )
    .subscribe();
}

async function loadPlayers() {
  if (!currentRoomId) return;

  const { data, error } = await supabase
    .from('RoomPlayers')
    .select('username, points')
    .eq('room_id', currentRoomId);

  if (error) {
    console.error('Failed to load players:', error.message);
    return;
  }

  const list = document.getElementById('player-list');
  if (list) {
    list.innerHTML = '';
    data.forEach((player) => {
      const li = document.createElement('li');
      li.textContent = `${player.username} (${player.points} pts)`;
      list.appendChild(li);
    });
  }
}
