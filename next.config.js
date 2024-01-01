/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            'images.unsplash.com',
            "utfs.io",
            "pic.superbed.cc",
        ],
    },
}

module.exports = nextConfig
