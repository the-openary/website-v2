"use client";

import Link from "next/link";
import { Anchor } from "@mantine/core";
import { ProjectOutline, ProjectOutlineItem } from "~/types/project_outline";
import { useRouter } from "next/navigation";
export default function SideNav({ outline }: { outline: ProjectOutline }) {
    const router = useRouter();
    const pre = (url: string) => {
        console.log("pre", url);
        router.prefetch(url);
        router.push(url);
        router.refresh();
    };
    return (
        <div>
            <h2>Sections</h2>
            {outline.map((item, index) => (
                <div key={index}>
                    <button onClick={() => pre(item.link)}>{item.name}</button>
                    {item.subsections?.map((subItem, index) => (
                        <div key={index} style={{ textIndent: "20px" }}>
                            <button onClick={() => pre(subItem.link)}>
                                {subItem.name}
                            </button>
                            {subItem.subsections?.map((subSubItem, index) => (
                                <div key={index} style={{ textIndent: "40px" }}>
                                    <button
                                        onClick={() => pre(subSubItem.link)}
                                    >
                                        {subSubItem.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
// function map_to_anchor(outline_item: ProjectOutlineItem, depth: number, pre: (url: string) => void){
//     return (
//         <ul>
//             {outline_item.subsections?.map((subItem, index) => (
//                 <li key={index} style={{ textIndent: `${depth * 20}px` }}>
//                     <button onClick={() => pre(subItem.link)}>{subItem.name}</button>
//                     {(subItem.subsections?.length || 0) > 0 &&
//                         map_to_anchor(subItem, depth + 1, pre)}
//                 </li>
//             ))}
//         </ul>
//     );
// }
