"use client";

import Link from "next/link";
import { Anchor, Title } from "@mantine/core";
import { TocRoot, TocItem, FlattenedTocItem } from "~/types/toc";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

export default function TableOfContents({ toc }: { toc: TocRoot }) {
    const [activeUrl, setActiveUrl] = useState<string | null>(null);
    const flattened = flattenToc(toc);
    const observers = flattened.map((item) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { ref, entry } = useIntersection({
            root: null,
            rootMargin: "0% 0% -80% 0%",
            threshold: 0,
        });
        return { ref: ref, entry: entry, url: item.url };
    });

    useEffect(() => {
        observers.forEach((observer) => {
            observer.ref(document.querySelector(observer.url));
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const inView = observers.find(
                (observer) => observer.entry?.isIntersecting,
            );
            if (inView) {
                setActiveUrl(inView.url);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [observers]);

    return (
        <div className="sticky top-1">
            <Title order={2}>On This Page</Title>
            {flattened.map((item, index) => (
                <div
                    key={index}
                    className={`indent-[${item.depth}rem] border-l p-1 pl-2 transition-all duration-200 ease-in-out ${activeUrl === item.url ? "border-l-green-800 bg-green-500 bg-opacity-20" : ""}`}
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
