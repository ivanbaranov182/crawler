import { Article, Category, ContentImage } from '../types';

export class Parser {
  protected removedTags: string[];
  protected readonly rootElement: Document;

  constructor() {
    this.removedTags = ['script'];
    this.rootElement = document;
  }

  get url(): string {
    return '';
  }

  get urlObj(): URL {
    return new URL(this.url);
  }

  get element(): HTMLElement | null {
    return null;
  }

  get domain(): string {
    return this.urlObj.hostname;
  }

  get slug(): string {
    return this.urlObj.pathname;
  }

  get categories(): Category[] {
    return [];
  }

  get image(): string {
    return '';
  }

  get createAt(): string {
    return '';
  }

  get updateAt(): string {
    return '';
  }

  get title(): string {
    return '';
  }

  get description(): string {
    return '';
  }

  get textHtml(): string {
    return '';
  }

  get content_images(): ContentImage[] {
    return [];
  }

  getElement(query: string, rootElement?: HTMLElement): HTMLElement | null {
    const root = rootElement || this.rootElement;
    return root.querySelector(query);
  }

  getElementAttributeValue(el: HTMLElement, param: string): string {
    return el.getAttribute(param) ?? '';
  }

  getElementTextValue(el: HTMLElement): string {
    return el.textContent ?? '';
  }

  removeHtml(el: Node): Node {
    this.removedTags.forEach((tag) => {
      el.childNodes.forEach((node) => {
        const nodeName = node.nodeName.toLowerCase();
        return nodeName === tag && el.removeChild(node);
      });
    });
    return el;
  }

  get articleElement(): HTMLElement | null {
    return this.element;
  }

  get result(): Article {
    return {
      domain: this.domain,
      slug: this.slug,
      categories: this.categories,
      image: this.image,
      create_at: this.createAt,
      update_at: this.updateAt,
      title: this.title,
      description: this.description,
      text_html: this.textHtml,
      content_images: this.content_images,
    };
  }
}
