// frontend/components/multiplayer.ts
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://YOUR_PROJECT.supabase.co', 'YOUR_PUBLIC_ANON_KEY');
export async function joinRoom(roomCode, playerName) {
    const { data, error } = await supabase
        .from('rooms')
        .insert([{ code: roomCode, player: playerName }]);
    if (error) {
        console.error('Join failed:', error.message);
    }
    else {
        console.log('Joined room:', data);
    }
}
