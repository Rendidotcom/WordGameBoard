document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const welcomeMessage = document.getElementById("welcome-message");

  // Pastikan elemen ditemukan sebelum menambahkan event listener
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      window.location.href = "/login.html";
    });
  }

  const username = localStorage.getItem("username");
  if (username && welcomeMessage) {
    welcomeMessage.textContent = `Halo, ${username}! Selamat bermain.`;
  } else if (welcomeMessage) {
    welcomeMessage.textContent = "Pengguna tidak dikenali.";
  }
});
