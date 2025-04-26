import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from 'vercel';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { file, filename } = req.body;

  if (!file || !filename) {
    return res.status(400).json({ error: 'Missing file or filename' });
  }

  try {
    const buffer = Buffer.from(file, 'base64');

    const { data, error } = await supabase.storage
      .from('avatars') // Ganti sesuai nama bucket kamu
      .upload(filename, buffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Upload successful', path: data.path });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Upload failed' });
  }
}
