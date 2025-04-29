import { supabase } from '../src/supabaseClient';
import bcrypt from 'bcryptjs'; // Menggunakan bcrypt untuk pengecekan password

export default async function handler(req, res) {
  // Pastikan hanya menerima permintaan POST
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  // Mengambil email dan password dari body request
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password wajib diisi' });
  }

  try {
    // Mengambil data user dari tabel 'users' berdasarkan email
    const { data, error } = await supabase
      .from('users')
      .select('id, username, password, points') // Pastikan password ada di sini
      .eq('email', email)
      .single(); // Mengambil hanya satu data user

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid credentials' }); // Email tidak ditemukan atau error
    }

    // Membandingkan password yang diinput dengan password yang ada di database
    const isPasswordMatch = await bcrypt.compare(password, data.password); // Membandingkan hashed password

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' }); // Password salah
    }

    // Jika berhasil login
    return res.status(200).json({
      message: 'Logged in successfully',
      user: { id: data.id, username: data.username, points: data.points },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' }); // Error server
  }
}
