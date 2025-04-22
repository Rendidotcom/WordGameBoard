import { Router } from 'express';
import { supabase } from '../supabaseClient';
const router = Router();
// Endpoint untuk menangani permainan
router.post('/', async (req, res) => {
    const { word } = req.body;
    const userId = req.user.id; // Ambil ID user dari token yang disertakan
    if (!word) {
        return res.status(400).json({ error: 'Word is required' });
    }
    try {
        // Simpan kata baru ke database dan hitung poin
        const { data, error } = await supabase
            .from('game_words')
            .insert([
            { word, user_id: userId }
        ]);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        // Kalkulasi poin (misalnya berdasarkan panjang kata)
        const points = word.length;
        // Update poin di tabel users
        const { data: userData, error: userError } = await supabase
            .from('users')
            .update({ points: supabase.raw('points + ?', [points]) })
            .eq('id', userId);
        if (userError) {
            return res.status(500).json({ error: userError.message });
        }
        res.json({ points: userData[0].points });
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});
export default router;
