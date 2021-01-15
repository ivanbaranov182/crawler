import { Article, ArticleStatistic } from './types';
export declare const msToSec: (ms: number) => number;
export declare const generateUniqueString: () => string;
export declare const formatDate: (dateString: string) => string;
export declare const addElement: (parentEl: HTMLElement | null, className: string, start?: boolean) => HTMLElement | undefined;
export declare const objectToFormData: (data: Article | ArticleStatistic) => FormData;
