/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			"assets-global.website-files.com"
		],
	},
	experimental: {
		images: {
			unoptimized: false,
			formats: ['image/webp'],
		},
	},
};

module.exports = nextConfig;
