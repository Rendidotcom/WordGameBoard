document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('register-form') as HTMLFormElement;

  form.addEventListener('submit', function (e: Event) {
    e.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
  
    if (!username || !password) {
      alert('Semua kolom harus diisi!');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.username === username);
  
    if (existingUser) {
      alert('Username sudah terdaftar!');
      return;
    }
  
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Registrasi berhasil!');
    window.location.href = 'login.html'; // arahkan ke halaman login
  });
});
