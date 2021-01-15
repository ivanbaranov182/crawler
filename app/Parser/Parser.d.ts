import { Article, Category, ContentImage } from '../types';
export declare class Parser {
    protected removedTags: string[];
    protected readonly rootElement: Document;
    constructor();
    get url(): string;
    get urlObj(): URL;
    get element(): HTMLElement | null;
    get domain(): string;
    get slug(): string;
    get categories(): Category[];
    get image(): string;
    get createAt(): string;
    get updateAt(): string;
    get title(): string;
    get description(): string;
    get textHtml(): string;
    get content_images(): ContentImage[];
    getElement(query: string, rootElement?: HTMLElement): HTMLElement | null;
    getElementAttributeValue(el: HTMLElement, param: string): string;
    getElementTextValue(el: HTMLElement): string;
    removeHtml(el: Node): Node;
    get articleElement(): HTMLElement | null;
    get result(): Article;
}
