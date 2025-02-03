/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",

  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Check for file changes every second
        aggregateTimeout: 300, // Small delay before reloading
      };
    }
    return config;
  },
};

export default config;
