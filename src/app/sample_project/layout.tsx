import { ProjectOutline } from "~/types/project_outline";
import ProjectShell from "../_components/project/shell";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import fs from "fs";
import { getTableOfContents } from "~/lib/toc";
import path from "path";

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
                        subsections: [
                            {
                                name: "this page doesnt exist",
                                link: "/noexist..",
                                subsections: [],
                            },
                            {
                                name: "this page doesnt exist 2!!",
                                link: "/noexist2...",
                                subsections: [],
                            },
                            {
                                name: "wow!",
                                link: "/wow!",
                                subsections: [],
                            },
                        ],
                    },
                    {
                        name: "Extras1",
                        link: "/sample_project/building/materials/extras1",
                        subsections: [],
                    },
                    {
                        name: "Extras2",
                        link: "/sample_project/building/materials/extras2",
                        subsections: [],
                    },
                ],
            },
        ],
    },
    { name: "More", link: "/sample_project/more", subsections: [] },
];

export default async function ProjectLayout({
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
    const file_path = `${process.cwd()}/.next/static/src/app${pathname}/page.mdx`;
    if (!fs.existsSync(file_path)) {
        return fs.readdirSync("./");
    }
    const file = fs.readFileSync(file_path, "utf-8");

    return (
        <ProjectShell outline={outline} toc={await getTableOfContents(file)}>
            {children}
        </ProjectShell>
    );
}
