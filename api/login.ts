import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../supabaseClient';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, points, password')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (data.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Jangan kirim password ke frontend
    const { password: _, ...safeUser } = data;

    return res.status(200).json({ message: 'Logged in', user: safeUser });

  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
