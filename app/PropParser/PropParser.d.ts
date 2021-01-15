import { Parser } from '../Parser';
export declare class PropParser extends Parser {
    private readonly articleQuery;
    constructor();
    get element(): HTMLElement | null;
    getElementParam(query: string, param: string | null): string;
    get url(): string;
    get createAt(): string;
    get updateAt(): string;
    get title(): string;
    get image(): string;
    get description(): string;
    get textHtml(): string;
}
