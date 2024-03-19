import Link from "next/link";
import { Anchor } from "@mantine/core";
import { TocRoot, TocItem } from "~/types/toc";

export default function TableOfContents({ toc }: { toc: TocRoot }) {
    return (
        <div>
            <h2>On This Page</h2>
            {toc.children?.map((item, index) => (
                <div key={index}>
                    <Anchor component={Link} href={item.url}>
                        {item.title}
                    </Anchor>
                    {map_to_anchor(item, 1)}
                </div>
            ))}
        </div>
    );
}
function map_to_anchor(outline_item: TocItem, depth: number) {
    return (
        <ul>
            {outline_item.children?.map((subItem, index) => (
                <li key={index} style={{ textIndent: `${depth * 20}px` }}>
                    <Anchor component={Link} href={subItem.url}>
                        {subItem.title}
                    </Anchor>
                    {(subItem.children?.length || 0) > 0 &&
                        map_to_anchor(subItem, depth + 1)}
                </li>
            ))}
        </ul>
    );
}
