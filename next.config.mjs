/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "kenh14cdn.com",
      "rainbow-heart.sk",
      "cdn.tuoitre.vn",
      "ss-images.saostar.vn",
      "encrypted-tbn0.gstatic.com",
      "t3.ftcdn.net",
    ],
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
};

export default nextConfig;
