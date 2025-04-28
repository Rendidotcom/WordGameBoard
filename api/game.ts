import { Router, Request, Response } from 'express';
import { supabase } from '../supabaseClient';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { word, userId } = req.body;

  if (!word || !userId) {
    return res.status(400).json({ error: 'Word and userId are required' });
  }

  try {
    // Simpan kata ke tabel game_words
    const { error: insertError } = await supabase
      .from('game_words')
      .insert([{ word, user_id: userId }]);

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    // Hitung poin
    const points = word.length;

    // Ambil poin user sekarang
    const { data: currentUser, error: getUserError } = await supabase
      .from('users')
      .select('points')
      .eq('id', userId)
      .single();

    if (getUserError || !currentUser) {
      return res.status(500).json({ error: getUserError?.message || 'User not found' });
    }

    const updatedPoints = currentUser.points + points;

    // Update poin user
    const { data: userData, error: updateError } = await supabase
      .from('users')
      .update({ points: updatedPoints })
      .eq('id', userId)
      .select();

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    res.json({ points: updatedPoints });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
