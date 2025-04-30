document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const welcomeMessage = document.getElementById("welcome-message");
  const username = localStorage.getItem("username");

  // Load audio
  const klikAudio = new Audio("/klik.mp3");

  if (username) {
    welcomeMessage.textContent = `Halo, ${username}!`;
  } else {
    window.location.href = "/login.html";
  }

  logoutBtn.addEventListener("click", () => {
    klikAudio.play().catch(() => {});
    localStorage.removeItem("username");
    alert("Anda telah logout!");
    window.location.href = "/login.html";
  });
});
