import { ProjectOutline } from "~/types/project_outline";
import ProjectShell from "../_components/project/shell";

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

export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ProjectShell outline={outline}>{children}</ProjectShell>;
}
