/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['assets-global.website-files.com'],
		unoptimized: false,
		formats: ['image/webp'],
	},
	reactStrictMode: false,
}

module.exports = nextConfig
