import { VercelRequest, VercelResponse } from '@vercel/node';

let users: { username: string; password: string }[] = []; // Data dummy dalam memori

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' }); // Hanya izinkan POST
    }

    // Cek apakah body request ada dan tipe data adalah object
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Request body tidak valid, harap kirimkan dalam format JSON' });
    }

    // Pastikan body memiliki username dan password
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password harus diisi' });
    }

    // Cek apakah username sudah terdaftar
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
      return res.status(409).json({ error: 'Username sudah terdaftar' });
    }

    // Simpan pengguna baru
    users.push({ username, password });

    return res.status(201).json({ success: true, message: 'Registrasi berhasil' });

  } catch (error) {
    console.error('Error in registration process:', error);

    // Pastikan error ditangani dengan baik, dan beri respons yang jelas
    return res.status(500).json({ error: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.' });
  }
}
