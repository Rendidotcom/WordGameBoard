import { createClient } from '@supabase/supabase-js';
// inisialisasi Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ success: false, message: 'Metode tidak diizinkan' });
    const { email, password, username } = req.body;
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username }
        }
    });
    if (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(200).json({ success: true, data });
}
