import { ProjectOutline } from "~/types/project_outline";
import ProjectShell from "../_components/project/shell";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTableOfContents } from "~/lib/toc";

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
    const header_list = headers();
    const header_url = header_list.get("x-url");
    if (!header_url) {
        notFound();
    }
    const pathname = new URL(header_url).pathname;
    const file_path = `${process.cwd()}/src/app${pathname}/page.mdx`;

    return (
        <ProjectShell
            outline={outline}
            toc={await getTableOfContents(file_path)}
        >
            {children}
        </ProjectShell>
    );
}
