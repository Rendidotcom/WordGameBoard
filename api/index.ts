import { login } from './login';
import { register } from './register';
import { startGame, endGame } from './game';

// Ganti dengan email dan password yang valid untuk testing manual
const email = 'user@example.com';
const password = 'securepassword123';

async function main() {
  try {
    console.log('📌 Mendaftarkan user...');
    const regData = await register(email, password);
    console.log('✅ Registrasi sukses:', regData);

    console.log('📌 Login user...');
    const loginData = await login(email, password);
    console.log('✅ Login sukses:', loginData);

    console.log('▶️ Mulai game...');
    startGame();

    console.log('⏹️ Selesai game...');
    endGame();

  } catch (error) {
    console.error('❌ Terjadi kesalahan:', error);
  }
}

main();
