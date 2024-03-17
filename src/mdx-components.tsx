import {
    Anchor,
    Title,
    AnchorProps,
    TitleProps,
    Image,
    ImageProps,
    Table,
    TableProps,
    TableThead,
    TableThProps,
    TableTbody,
    TableTbodyProps,
    TableTrProps,
    TableTr,
    TableTh,
    TableTd,
    TableTdProps,
    Blockquote,
    BlockquoteProps,
    CodeProps,
    Code,
} from "@mantine/core";
import type { MDXComponents } from "mdx/types";
import { default as NextImage } from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: (props) => <Title order={1} {...(props as TitleProps)}></Title>,
        h2: (props) => {
            if (props.children?.toString() === "Contents") {
                return (
                    <Title order={2} {...(props as TitleProps)}>
                        On This Page:
                    </Title>
                );
            }

            return <Title order={2} {...(props as TitleProps)}></Title>;
        },
        h3: (props) => <Title order={3} {...(props as TitleProps)}></Title>,
        h4: (props) => <Title order={4} {...(props as TitleProps)}></Title>,
        h5: (props) => <Title order={5} {...(props as TitleProps)}></Title>,
        h6: (props) => <Title order={6} {...(props as TitleProps)}></Title>,
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
        table: (props) => <Table {...(props as TableProps)}></Table>,
        thead: (props) => (
            // @ts-ignore
            <TableThead {...(props as TableThProps)}></TableThead>
        ),
        tbody: (props) => (
            <TableTbody {...(props as TableTbodyProps)}></TableTbody>
        ),
        tr: (props) => <TableTr {...(props as TableTrProps)}></TableTr>,
        th: (props) => <TableTh {...(props as TableThProps)}></TableTh>,
        td: (props) => <TableTd {...(props as TableTdProps)}></TableTd>,
        blockquote: (props) => (
            <Blockquote {...(props as BlockquoteProps)}></Blockquote>
        ),
        code: (props) => (
            <Code
                {...(props as CodeProps)}
                className="whitespace-pre-wrap"
            ></Code>
        ),

        ...components,
    };
}
