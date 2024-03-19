/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// await import("./src/env.mjs");
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import { remarkMdxToc } from "remark-mdx-toc";
import withMDX from "@next/mdx";
import CopyPlugin from "copy-webpack-plugin";

/** @type {import("next").NextConfig} */
const config = {
    env: {},
    compress: true,
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    webpack(config, { isServer }) {
        if (!isServer) {
            config.plugins.push(
                new CopyPlugin({
                    patterns: [{ from: "src/", to: "src/" }],
                }),
            );
        }

        return config;
    },
    experimental: {
        outputFileTracingIncludes: {
            src: ["./src/**/*"],
        },
    },
};

export default withMDX({
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
    },
})(config);
