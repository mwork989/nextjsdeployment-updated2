/** @type {import('next').NextConfig} */
const nextConfig = {
    output:"export",
    distDir:"dist",
    images:{
        remotePatterns:[{protocol:"https", hostname:"fakestoreapi.com"}],
        unoptimized:true
    }
};

export default nextConfig;
