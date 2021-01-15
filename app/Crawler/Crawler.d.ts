import { ArticleStatistic } from '../types';
export declare class Crawler {
    private readonly parser;
    private readonly article;
    private readonly articleEl;
    private readonly userId;
    private read;
    private readonly articleStartEl;
    private readonly articleEndEl;
    private startReadTime;
    private readonly sender;
    constructor();
    get statistic(): ArticleStatistic;
    sendArticleInfo(): void;
    articleRead(): void;
    articleReject(): void;
    setObserver(): void;
    pageLeave(): void;
    initEvents(): void;
}
