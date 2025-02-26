export function formatImageUrl(url) {
    if (!url) return "/default-image.jpg"; // Imagen por defecto si no hay URL
    return url.startsWith("//") ? `https:${url}` : url;
  }
  