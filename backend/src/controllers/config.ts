// src/constants/config.ts
export const API_BASE_URL = ''; // o variable de entorno
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Tamaños disponibles: w92, w154, w185, w342, w500, w780, original
export function getPosterUrl(path: string | null, size: 'w185' | 'w342' | 'w500' = 'w342') {
  if (!path) return null; // podés devolver un placeholder local acá
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}