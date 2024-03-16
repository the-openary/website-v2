export type ProjectOutlineItem = {
    name: string,
    link: string,
    subsections: ProjectOutlineItem[]
}
export type ProjectOutline = ProjectOutlineItem[]
