// C:\Users\rendi\Documents\coding\WordGameBoard\api\login.ts
import { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

// Ganti dengan env aslimu jika belum
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://tkckumxywpobbnklyhit.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrY2t1bXh5d3BvYmJua2x5aGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxOTg2MDAsImV4cCI6MjA2MDc3NDYwMH0.DjRa4HdiRwLqbeKEpWrNCgKDqS9iV1sKeA7q0G0n4VI'
)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi' })
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error || !data.session) {
    return res.status(401).json({ message: error?.message || 'Login gagal' })
  }

  return res.status(200).json({
    message: 'Login berhasil',
    token: data.session.access_token,
    user: {
      id: data.user.id,
      email: data.user.email
    }
  })
}
