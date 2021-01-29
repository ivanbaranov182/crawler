import { Parser } from '../Parser';
import { Category, ContentImage } from '../types';
export declare class PropParser extends Parser {
    private readonly articleQuery;
    private readonly articleBodyEl;
    private readonly articleAuthorEl;
    private readonly articleSectionEl;
    constructor();
    get element(): HTMLElement | null;
    getElementParam(query: string, param: string | null): string;
    getElement(query: string, rootElement?: HTMLElement): HTMLElement | null;
    getElementAttributeValue(el: HTMLElement, param: string): string;
    getElementTextValue(el: HTMLElement): string;
    removeHtml(el: HTMLElement): HTMLElement;
    get url(): string;
    get categories(): Category[];
    get createAt(): string;
    get updateAt(): string;
    get title(): string;
    get image(): string;
    get description(): string;
    get textHtml(): string;
    get content_images(): ContentImage[];
    get author_id(): string;
    get author_name(): string;
}
