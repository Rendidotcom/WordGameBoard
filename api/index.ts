// index.ts
declare const supabase: any;

async function fetchUser(): Promise<void> {
  const response = await fetch("/api/user");
  try {
    const result = await response.json();
    if (response.ok) {
      const userEmail = result.email || "Pengguna";
      const messageEl = document.getElementById("welcome-message");
      if (messageEl) {
        messageEl.textContent = `Halo, ${userEmail}!`;
      }
    } else {
      alert("Gagal mendapatkan data user. Silakan login ulang.");
      window.location.href = "login.html";
    }
  } catch (err) {
    console.error("Gagal parsing data user:", err);
    window.location.href = "login.html";
  }
}

async function logout(): Promise<void> {
  const response = await fetch("/api/logout", {
    method: "POST"
  });

  if (response.ok) {
    window.location.href = "login.html";
  } else {
    alert("Logout gagal.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUser();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
