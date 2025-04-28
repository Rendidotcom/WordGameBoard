document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form') as HTMLFormElement | null;

  if (!form) {
    console.error('Register form tidak ditemukan.');
    return;
  }

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const usernameInput = document.getElementById('username') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;

    if (!usernameInput || !passwordInput) {
      alert('Input username atau password tidak ditemukan.');
      return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert('Semua kolom harus diisi!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]') as Array<{ username: string; password: string }>;
    const existingUser = users.find((u) => u.username === username);

    if (existingUser) {
      alert('Username sudah terdaftar!');
      return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registrasi berhasil!');
    window.location.href = 'login.html'; // Arahkan ke halaman login
  });
});
