// submitScore.ts
import { supabase } from './supabaseClient';

export async function submitScore(word: string, points: number, userId: string) {
  const { data, error } = await supabase
    .from('scores')
    .insert([{ word, points, user_id: userId }]);

  if (error) {
    console.error("❌ Failed to insert score:", error);
  } else {
    console.log("✅ Score inserted:", data);
  }
}
