/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
                pathname: '**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/login',
                destination: '/screens/login',
            },
            {
                source: '/dashboard',
                destination: '/screens/dashboard',
            },
            {
                source: '/dashboard/create',
                destination: '/screens/dashboard/create',
            },
        ];
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;