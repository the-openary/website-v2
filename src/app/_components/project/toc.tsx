"use client";

import Link from "next/link";
import { Anchor } from "@mantine/core";
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
        <div className="sticky top-0">
            <h2>On This Page</h2>
            {flattened.map((item, index) => (
                <div key={index} style={{ textIndent: `${item.depth * 20}px` }}>
                    <Anchor
                        href={item.url}
                        style={{
                            fontWeight:
                                item.url === activeUrl ? "bold" : "normal",
                        }}
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
