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
        ];
    },
};

export default nextConfig;
