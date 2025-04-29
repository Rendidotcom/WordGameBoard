import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabaseClient';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, points, password')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (data.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const { password: _, ...safeUser } = data;

    const token = `${safeUser.id}-${Date.now()}`;

    return res.status(200).json({ message: 'Login successful', token, user: safeUser });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
