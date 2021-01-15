export type Article = {
  domain: string;
  slug: string;
  categories: Category[];
  image: string;
  published_at: string;
  edited_at: string;
  title: string;
  description: string;
  text_html: string;
  content_images: ContentImage[];
};

export type Category = string;

export type ContentImage = string;

export type ArticleStatistic = {
  user: string;
  domain: string;
  slug: string;
  time: number;
  read: number;
};
