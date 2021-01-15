import { Article, ArticleStatistic } from '../types';
export declare class Sender {
    private readonly canBeacon;
    constructor();
    getApiUrl(url: string): string;
    send(data: Article | ArticleStatistic, url: string, preferBeacon?: boolean): boolean | void;
    sendBeacon(data: Article | ArticleStatistic, url: string): boolean;
    fetch(data: Article | ArticleStatistic, url: string): void;
}
