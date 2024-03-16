import React from "react";
import { ProjectOutline, ProjectOutlineItem } from "~/types/project_outline";
import { Anchor, Grid, GridCol } from "@mantine/core";
import Link from "next/link";

function map_to_anchor(outline_item: ProjectOutlineItem, depth: number) {
    return (
        <ul>
            {outline_item.subsections.map((subItem, index) => (
                <li key={index} style={{ marginLeft: `${depth * 20}px` }}>
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

export default function ProjectShell({
    outline,
    children,
}: {
    outline: ProjectOutline;
    children: React.ReactNode;
}) {
    return (
        <Grid>
            <GridCol span="auto">
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
            </GridCol>
            <GridCol span={6}>{children}</GridCol>
            <GridCol span="auto">Table of contents</GridCol>
        </Grid>
    );
}
