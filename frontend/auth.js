// Inisialisasi Supabase
const supabase = createClient('https://tkckumxywpobbnklyhit.supabase.co', 'YOUR_PUBLIC_ANON_KEY');

// Fungsi login
async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert('Login gagal: ' + error.message);
  } else {
    window.location.href = '/dashboard.html';
  }
}

// Fungsi register
async function register(email, password) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert('Registrasi gagal: ' + error.message);
  } else {
    alert('Registrasi berhasil! Silakan cek email verifikasi.');
  }
}

// Fungsi logout
async function logout() {
  await supabase.auth.signOut();
  window.location.href = '/login.html';
}
