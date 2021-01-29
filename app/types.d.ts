export declare type Article = {
    domain: string;
    slug: string;
    categories: Category[];
    image: string;
    title: string;
    description: string;
    text_html: string;
    content_images: ContentImage[];
    author_id: string;
    author_name: string;
    published_at: string;
    edited_at: string;
};
export declare type Category = string;
export declare type ContentImage = string;
export declare type ArticleStatistic = {
    user: string;
    domain: string;
    slug: string;
    time: number;
    read: number;
};
