import { ProjectOutline } from "~/types/project_outline";
import ProjectShell from "../_components/project/shell";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTableOfContents } from "~/lib/toc";
import { resolve_filepath } from "~/lib/util";

const outline: ProjectOutline = [
    {
        name: "Development",
        link: "/sample_project/development",
        subsections: [],
    },
    {
        name: "Building",
        link: "/sample_project/building",
        subsections: [
            {
                name: "Materials",
                link: "/sample_project/building/materials",
                subsections: [
                    {
                        name: "Extras",
                        link: "/sample_project/building/materials/extras",
                    },
                    {
                        name: "Extras1",
                        link: "/sample_project/building/materials/extras1",
                    },
                    {
                        name: "Extras2",
                        link: "/sample_project/building/materials/extras2",
                    },
                ],
            },
        ],
    },
    { name: "More", link: "/sample_project/more" },
];

export default async function ProjectTemplate({
    children,
}: {
    children: React.ReactNode;
}) {
    const mdx_path = resolve_filepath(headers());
    if (!mdx_path) {
        return notFound();
    }
    return (
        <ProjectShell
            outline={outline}
            toc={await getTableOfContents(mdx_path)}
        >
            {children}
        </ProjectShell>
    );
}
