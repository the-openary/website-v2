// This module was created by shadcn-ui/taxonomy
// commit: 03ef292d26f1f96dfbd9d2773284c370e3fec7e4
// https://github.com/shadcn-ui/taxonomy/blob/main/lib/toc.ts
// code has been modified slightly.

import { Nodes } from "mdast";
import { VFile } from "vfile";
import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import { TocRoot } from "~/types/toc";
import fs from "fs";
const textTypes = ["text", "emphasis", "strong", "inlineCode"];

function flattenNode(node: Nodes): string {
    const p: string[] = [];
    visit(node, (item) => {
        if (!textTypes.includes(item.type)) return;
        // @ts-ignore
        p.push(item.value);
    });
    return p.join(``);
}

function getItems(node: ReturnType<typeof toc>["map"], current: any): TocRoot {
    if (!node) {
        return {};
    }
    // @ts-ignore
    if (node.type === "paragraph") {
        visit(node, (item) => {
            if (item.type === "link") {
                current.url = item.url;
                current.title = flattenNode(node);
            }

            if (item.type === "text") {
                current.title = flattenNode(node);
            }
        });

        return current;
    }

    if (node.type === "list") {
        // @ts-ignore
        current.children = node.children.map((i: Nodes) => getItems(i, {}));

        return current;
    } else if (node.type === "listItem") {
        // @ts-ignore
        const heading = getItems(node.children[0], {});

        if (node.children.length > 1) {
            // @ts-ignore
            getItems(node.children[1], heading);
        }

        return heading;
    }

    return {};
}

const getToc = () => (node: Nodes, file: VFile) => {
    const table = toc(node);
    // @ts-ignore
    file.data = getItems(table.map, {}); // dangerously set unknown prop
};

export type TableOfContents = TocRoot;

interface Cache {
    [key: string]: TocRoot;
}

function getTableOfContents_memo() {
    const cache: Cache = {};

    return async function (fpath: string) {
        if (fpath in cache) {
            return cache[fpath] as TocRoot;
        }
        const content = fs.readFileSync(fpath, "utf-8");
        const result = await remark().use(getToc).process(content);
        cache[fpath] = result.data as TocRoot;
        return cache[fpath] as TocRoot;
    };
}
export const getTableOfContents = getTableOfContents_memo();
