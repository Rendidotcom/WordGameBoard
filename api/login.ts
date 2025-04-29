// api/login.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabaseClient';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1) Hanya terima POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2) Parse body (Vercel kadang body sudah object, kadang string)
    const { email, password } = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }

    // 3) Hit Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // 4) Berhasil
    return res.status(200).json({ user: data.user });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
