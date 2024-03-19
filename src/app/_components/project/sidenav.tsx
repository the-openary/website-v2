import Link from "next/link";
import { Anchor } from "@mantine/core";
import { ProjectOutline, ProjectOutlineItem } from "~/types/project_outline";
export default function SideNav({ outline }: { outline: ProjectOutline }) {
    return (
        <div>
            <h2>Sections</h2>
            {outline.map((item, index) => (
                <div key={index}>
                    <Anchor component={Link} href={item.link}>
                        {item.name}
                    </Anchor>
                    {map_to_anchor(item, 1)}
                </div>
            ))}
        </div>
    );
}
function map_to_anchor(outline_item: ProjectOutlineItem, depth: number) {
    return (
        <ul>
            {outline_item.subsections.map((subItem, index) => (
                <li key={index} style={{ textIndent: `${depth * 20}px` }}>
                    <Anchor component={Link} href={subItem.link}>
                        {subItem.name}
                    </Anchor>
                    {subItem.subsections.length > 0 &&
                        map_to_anchor(subItem, depth + 1)}
                </li>
            ))}
        </ul>
    );
}
