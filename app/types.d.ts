export declare type Article = {
    domain: string;
    slug: string;
    categories: Category[];
    image: string;
    create_at: string;
    update_at: string;
    title: string;
    description: string;
    text_html: string;
    content_images: ContentImage[];
};
export declare type Category = string;
export declare type ContentImage = string;
export declare type ArticleStatistic = {
    user: string;
    domain: string;
    slug: string;
    time: number;
    read: boolean;
};
