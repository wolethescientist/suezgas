import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * /order and /pricing were the retail surface. They are gone, but they were
   * the two highest-intent pages on the site and will be sitting in search
   * results, WhatsApp forwards and printed material for a long time. A 301
   * carries that traffic — and its ranking — to where buying now happens
   * instead of handing those people a 404.
   */
  async redirects() {
    return [
      { source: "/order", destination: "/#app", permanent: true },
      { source: "/pricing", destination: "/#app", permanent: true },
    ];
  },
};

export default nextConfig;
