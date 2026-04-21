export function normalizeAuthors(authors?: string[]): string {
  if (!authors || authors.length === 0) return '';

  return authors
    .map((a) => a.trim().toLowerCase())
    .sort()
    .join(',');
}
