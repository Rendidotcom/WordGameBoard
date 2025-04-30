import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://tkckumxywpobbnklyhit.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrY2t1bXh5d3BvYmJua2x5aGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxOTg2MDAsImV4cCI6MjA2MDc3NDYwMH0.DjRa4HdiRwLqbeKEpWrNCgKDqS9iV1sKeA7q0G0n4VI'
const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.getElementById('registerForm')
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const username = document.getElementById('username').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signUpError) {
    alert('Gagal daftar: ' + signUpError.message)
    return
  }

  const { user } = signUpData

  const { error: insertError } = await supabase
    .from('WordGameBoard')
    .insert([{ username, email, password, points: 0 }])

  if (insertError) {
    alert('Gagal simpan data: ' + insertError.message)
    return
  }

  alert('Pendaftaran berhasil!')
  form.reset()
})
