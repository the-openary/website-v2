import React from "react";
import { ProjectOutline } from "~/types/project_outline";
import { Grid, GridCol } from "@mantine/core";
import SideNav from "./sidenav";
import { TocRoot } from "~/types/toc";
import TableOfContents from "./toc";

export default function ProjectShell({
    outline,
    children,
    toc,
}: {
    outline: ProjectOutline;
    children: React.ReactNode;
    toc: TocRoot;
}) {
    return (
        <Grid className="w-full">
            <GridCol span={2}>
                <SideNav outline={outline} />
            </GridCol>
            <GridCol span={8}>{children}</GridCol>
            <GridCol span={2}>
                <TableOfContents toc={toc} />
            </GridCol>
        </Grid>
    );
}
