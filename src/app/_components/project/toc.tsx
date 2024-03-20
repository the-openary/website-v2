"use client";

import React, { useEffect, useRef } from "react";
import { Anchor, Title } from "@mantine/core";
import { TocRoot, FlattenedTocItem, TocItem } from "~/types/toc";
import { useDebouncedState } from "@mantine/hooks";

export default function TableOfContents({ toc }: { toc: TocRoot }) {
    const [activeUrl, setActiveUrl] = useDebouncedState<string | null>(
        null,
        200,
    );
    const flattened = flattenToc(toc);
    const observersRef = useRef<IntersectionObserver[]>([]);
    const rc = useRef(0);

    useEffect(() => {
        observersRef.current = flattened.map((item) => {
            return new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveUrl(item.url);
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: "0% 0% -80% 0%",
                    threshold: 0,
                },
            );
        });
    }, [flattened, setActiveUrl]);

    useEffect(() => {
        observersRef.current.forEach((observer, index) => {
            // @ts-ignore
            const target = document.querySelector(flattened[index].url);
            if (target) {
                observer.observe(target);
            }
        });

        return () => {
            observersRef.current.forEach((observer) => observer.disconnect());
        };
    }, [flattened]);
    rc.current++;
    console.log(rc);

    return (
        <div className="sticky top-1">
            <Title order={2}>On This Page</Title>
            {flattened.map((item, index) => (
                <div
                    key={index}
                    className={`indent-[${item.depth}rem] border-l p-1 pl-2 transition-all duration-100 ease-in-out ${
                        activeUrl === item.url
                            ? "border-l-green-800 bg-green-500 bg-opacity-20"
                            : ""
                    }`}
                >
                    <Anchor
                        href={item.url}
                        className="appearance-none text-inherit no-underline decoration-transparent hover:no-underline"
                    >
                        {item.title}
                    </Anchor>
                </div>
            ))}
        </div>
    );
}

function flattenToc(root: TocRoot): FlattenedTocItem[] {
    const flattenedArray: FlattenedTocItem[] = [];

    function flattenRecursive(item: TocItem, depth: number) {
        flattenedArray.push({ ...item, depth });
        if (item.children) {
            item.children.forEach((child) =>
                flattenRecursive(child, depth + 1),
            );
        }
    }

    if (root.children) {
        root.children.forEach((child) => flattenRecursive(child, 0));
    }

    return flattenedArray;
}
