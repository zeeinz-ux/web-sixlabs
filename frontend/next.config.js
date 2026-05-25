/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  // Future: allow Firebase Storage images
  // images: { domains: ['firebasestorage.googleapis.com'] },
};

// Bagian ini diubah menjadi export default
export default nextConfig;
