"use strict";
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const result = await response.json();
        if (result.success) {
            alert('Registrasi berhasil! Cek email untuk verifikasi.');
        }
        else {
            alert(`Gagal: ${result.message}`);
        }
    }
    catch (err) {
        alert('Terjadi kesalahan jaringan.');
        console.error(err);
    }
});
