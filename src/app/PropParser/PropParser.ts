import { Parser } from '../Parser';
import { formatDate } from '../utils';
import { Category, ContentImage } from '../types';

export class PropParser extends Parser {
  private readonly articleQuery: string;
  private articleBodyEl: HTMLElement | null;

  constructor() {
    super();
    this.articleQuery = '[itemtype="http://schema.org/NewsArticle"]';
    this.articleBodyEl = this.element && this.getElement('[itemprop="articleBody"]', this.element);
  }

  get element(): HTMLElement | null {
    return document.querySelector(this.articleQuery);
  }

  getElementParam(query: string, param: string | null): string {
    const el = this.element && this.getElement(query, this.element);
    if (!el) return '';
    return param ? this.getElementAttributeValue(el, param) : this.getElementTextValue(el);
  }

  getElementsParam(query: string, param: string | null): string[] {
    const elements = this.element && this.getElement(query, this.element);
    if (!elements) return [];
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

  get url(): string {
    return this.getElementParam('[itemprop="mainEntityOfPage"]', 'itemid') ?? window.location.href;
  }

  get categories(): Category[] {
    return this.getElementsParam('[itemprop="section"]', 'content');
  }

  get createAt(): string {
    const date = this.getElementParam('[itemprop="datePublished"]', 'content');
    return date ? formatDate(date) : '';
  }

  get updateAt(): string {
    const date = this.getElementParam('[itemprop="dateModified"]', 'content');
    return date ? formatDate(date) : '';
  }

  get title(): string {
    return this.getElementParam('[itemprop="headline"]', null);
  }

  get image(): string {
    return this.getElementParam('[itemprop="image"] img', 'src');
  }

  get description(): string {
    return this.getElementParam('[itemprop="description"]', null);
  }

  get textHtml(): string {
    if (!this.articleBodyEl) return '';
    const article = this.articleBodyEl.cloneNode(true);
    const normalizedArticle = this.removeHtml(article);
    return normalizedArticle.textContent ? normalizedArticle.textContent.trim() : '';
  }

  get content_images(): ContentImage[] {
    if (!this.articleBodyEl) return [];
    const imageElements = this.articleBodyEl.querySelectorAll('img');
    const images: string[] = [];
    imageElements.forEach((image) => {
      images.push(this.getElementAttributeValue(image, 'src'));
    });
    return images;
  }
}
