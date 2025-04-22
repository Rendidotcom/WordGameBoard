document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault()
  
    const username = (document.getElementById('register-username') as HTMLInputElement).value
    const email = (document.getElementById('register-email') as HTMLInputElement).value
    const password = (document.getElementById('register-password') as HTMLInputElement).value
  
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })
  
      const result = await response.json()
      if (result.success) {
        alert('Registrasi berhasil! Cek email untuk verifikasi.')
      } else {
        alert(`Gagal: ${result.message}`)
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.')
      console.error(err)
    }
  })
  