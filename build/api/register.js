import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Memuat variabel lingkungan
dotenv.config();

// Inisialisasi Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  // Memastikan metode yang digunakan adalah POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Metode tidak diizinkan' });
  }

  // Mengambil data dari body request
  const { email, password, username } = req.body;

  // Validasi input
  if (!email || !password || !username) {
    return res.status(400).json({ success: false, message: 'Email, password, dan username diperlukan' });
  }

  // Melakukan signup dengan Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  // Menangani error jika ada
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  // Jika berhasil
  return res.status(200).json({ success: true, data });
}
