/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import withMDX from "@next/mdx"
/** @type {import("next").NextConfig} */
const config = {
    env: {},
    output: "export",
    compress: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

};

export default withMDX()(config);
