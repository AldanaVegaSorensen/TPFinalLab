export const API_BASE_URL = '';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';


export function getPosterUrl(path: string | null, size: 'w185' | 'w342' | 'w500' = 'w342') {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}