/**
 * Normalizes text by removing accents/diacritics and trimming whitespace
 * @param {string} text - The text to normalize
 * @returns {string} - Normalized text
 */
export function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}
