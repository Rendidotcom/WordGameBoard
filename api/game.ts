async function checkUser(): Promise<void> {
  const response = await fetch("/api/user");
  if (!response.ok) {
    window.location.href = "login.html";
  }
}

function getRandomWord(): string {
  const words = ["coding", "typescript", "vercel", "supabase", "frontend"];
  return words[Math.floor(Math.random() * words.length)];
}

let currentWord = getRandomWord();

function initGame(): void {
  const submitBtn = document.getElementById("submit");
  const guessInput = document.getElementById("guess") as HTMLInputElement;
  const resultDiv = document.getElementById("result");

  if (submitBtn && guessInput && resultDiv) {
    submitBtn.addEventListener("click", () => {
      const userGuess = guessInput.value.trim().toLowerCase();

      if (userGuess === "") {
        resultDiv.textContent = "Masukkan tebakan terlebih dahulu.";
        return;
      }

      if (userGuess === currentWord) {
        resultDiv.textContent = "🎉 Benar! Kamu menebak dengan tepat!";
        currentWord = getRandomWord(); // Reset word
      } else {
        resultDiv.textContent = "❌ Salah! Coba lagi.";
      }

      guessInput.value = "";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkUser();
  initGame();
});
