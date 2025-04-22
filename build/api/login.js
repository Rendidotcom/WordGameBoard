import { supabase } from '../src/supabaseClient';
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    const { email, password } = req.body;
    const { data, error } = await supabase
        .from('users')
        .select('id, username, points')
        .eq('email', email)
        .eq('password', password)
        .single();
    if (error || !data)
        return res.status(401).json({ error: 'Invalid credentials' });
    res.status(200).json({ message: 'logged in', user: data });
}
