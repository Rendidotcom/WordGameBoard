import { VercelRequest, VercelResponse } from '@vercel/node';

let users: { username: string; password: string }[] = []; // Data dummy dalam memori

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' }); // Hanya izinkan POST
    }

    // Pastikan body request ada dan terstruktur dengan benar
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Request body tidak valid' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password harus diisi' });
    }

    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
      return res.status(409).json({ error: 'Username sudah terdaftar' });
    }

    users.push({ username, password });

    return res.status(200).json({ success: true, message: 'Registrasi berhasil' });

  } catch (error) {
    console.error('Error in registration process:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
}
