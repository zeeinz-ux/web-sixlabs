/**
 * Merge class names (simple utility without clsx dependency)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Truncate text to a given length
 */
export function truncate(str, length = 100) {
  if (!str) return "";
  return str.length > length ? str.slice(0, length).trimEnd() + "…" : str;
}

/**
 * Smooth scroll to section
 */
export function scrollToSection(href) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Build WhatsApp link with pre-filled message
 */
export function buildWhatsAppLink(phone, message) {
  const cleaned = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

/**
 * Check if in browser (SSR safe)
 */
export function isBrowser() {
  return typeof window !== "undefined";
}
