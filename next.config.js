/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    GOOGLE_OAUTH_ID:"497786189868-pb0lkpf45qpcr9rpl4ie7363bh7h9o45.apps.googleusercontent.com",
    GOOGLE_SECRET:"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",
    NEXTAUTH_URL:"http://localhost:3000",
    NEXTAUTH_SECRET:"ca34522e48d2299195fabb4a825572a7cad28a1f6f0ee657ff078a9f671f66e8",
    SANITY_PROJECT_ID:"bwpbrlr1",
    SANITY_DATASET:"production",
    SANITY_SECRET_TOKEN:"sk1gRQF37BIOV4xe1z84MvIhPRfBdwkHIp4Z8S9Iz0F7aEL59y06S1k5qN3uMjBPtJ04RKkDbmGZhVTgqYmCFPe5GP3f1fMfRJsBKVSHfs8fyNavjmCmJTSKPCRJz6EXPiY2G9HGTGmKewQqFSbeDccHDD0YHhhqzoGrU3UN74eG3c9iJhu9",
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  crossOrigin: "anonymous",
  reactStrictMode: false,
}

module.exports = nextConfig
