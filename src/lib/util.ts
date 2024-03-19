import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export function resolve_filepath(headers: ReadonlyHeaders): string | null {
    const url = headers.get("x-url");
    if (!url) {
        return null;
    }
    const pathname = new URL(url).pathname;
    return `${process.cwd()}/src/app${pathname}/page.mdx`; // adjust path for prod
}
