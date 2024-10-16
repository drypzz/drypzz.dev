/** @type {import('next').NextConfig} */
const nextConfig = {
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
