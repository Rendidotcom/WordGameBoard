import { VercelRequest, VercelResponse } from '@vercel/node';

let users: { username: string; password: string }[] = []; // Data dummy dalam memori

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' }); // Hanya izinkan POST
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
}
