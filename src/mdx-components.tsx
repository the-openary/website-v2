import {
    Anchor,
    Title,
    AnchorProps,
    TitleProps,
    Image,
    ImageProps,
} from "@mantine/core";
import type { MDXComponents } from "mdx/types";
import { default as NextImage } from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: (props) => <Title order={1} {...(props as TitleProps)}></Title>,
        a: (props) => (
            <Anchor
                href={props.href as string}
                {...(props as AnchorProps)}
                component={Link}
            />
        ),
        img: (props) => (
            <Image
                {...(props as ImageProps)}
                alt={props.alt as string}
                component={NextImage}
            ></Image>
        ),

        ...components,
    };
}
