/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:[ "pbs.twimg.com","wpdaddy.com","i1.sndcdn.com" ]
  }
}

module.exports = nextConfig
