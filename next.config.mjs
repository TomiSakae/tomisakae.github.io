/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    images: {
        unoptimized: true,
        domains: ['media.kitsu.io'],
    },
}

export default nextConfig;
