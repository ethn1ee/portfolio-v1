/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/ethn1ee.github.io",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
