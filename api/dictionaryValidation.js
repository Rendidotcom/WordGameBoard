/**
 * Memvalidasi apakah kata yang diberikan adalah kata bahasa Inggris yang valid.
 * Menggunakan https://api.dictionaryapi.dev sebagai sumber kamus gratis.
 *
 * @param {string} word - Kata yang akan divalidasi
 * @returns {Promise<boolean>} - True jika valid, false jika tidak ditemukan
 */
export async function isValidEnglishWord(word) {
    if (!word || typeof word !== 'string' || word.length < 2) {
      return false;
    }
  
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      return Array.isArray(data) && data.length > 0;
    } catch (error) {
      console.error('Error validating word:', error);
      return false;
    }
  }
  