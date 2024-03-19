export interface TocItem {
    title: string;
    url: string;
    children?: TocItem[];
}

export interface TocRoot {
    children?: TocItem[];
}

export interface FlattenedTocItem extends TocItem {
    depth: number;
}
