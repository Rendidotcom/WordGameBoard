async function checkUser(): Promise<string | null> {
  try {
    const response = await fetch("/api/user");
    if (!response.ok) {
      window.location.href = "login.html";
      return null;
    }
    const data = await response.json();
    return data.user?.id || null;
  } catch (err) {
    console.error("Gagal mengecek user:", err);
    window.location.href = "login.html";
    return null;
  }
}

function previewImage(file: File): void {
  const preview = document.getElementById("preview") as HTMLImageElement;
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result as string;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
    preview.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const userId = await checkUser();
  if (!userId) return;

  const fileInput = document.getElementById("file-input") as HTMLInputElement;
  const uploadButton = document.getElementById("upload-button") as HTMLButtonElement;
  const messageDiv = document.getElementById("message") as HTMLDivElement;

  if (fileInput && uploadButton && messageDiv) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (file) previewImage(file);
    });

    uploadButton.addEventListener("click", async () => {
      const file = fileInput.files?.[0];
      if (!file) {
        alert("Pilih gambar terlebih dahulu.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          messageDiv.innerHTML = `✅ Upload berhasil!<br><a href="${result.url}" target="_blank">Lihat gambar</a>`;
        } else {
          const errorText = await response.text();
          messageDiv.textContent = `❌ Upload gagal: ${errorText}`;
        }
      } catch (error) {
        console.error("Upload error:", error);
        messageDiv.textContent = "❌ Upload error.";
      }
    });
  }
});
