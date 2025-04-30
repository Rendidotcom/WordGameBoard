document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const welcomeMessage = document.getElementById("welcome-message");

  // Simulasi ambil data user
  setTimeout(() => {
    welcomeMessage.textContent = "Halo, Rendi!";
  }, 1000);

  logoutBtn.addEventListener("click", () => {
    const audio = new Audio("/klik.mp3");
    audio.play().catch((err) => console.warn("Audio error:", err));

    // Simulasi logout
    setTimeout(() => {
      alert("Anda telah logout!");
      window.location.reload();
    }, 500);
  });
});
