import { Parser } from '../Parser';
import { formatDate } from '../utils';

export class PropParser extends Parser {
  private readonly articleQuery: string;

  constructor() {
    super();
    this.articleQuery = '[itemtype="http://schema.org/NewsArticle"]';
  }

  get element(): HTMLElement | null {
    return document.querySelector(this.articleQuery);
  }

  getElementParam(query: string, param: string | null): string {
    const el = this.element && this.getElement(query, this.element);
    if (!el) return '';
    return param ? this.getElementAttributeValue(el, param) : this.getElementTextValue(el);
  }

  get url(): string {
    return this.getElementParam('[itemprop="mainEntityOfPage"]', 'itemid') ?? window.location.href;
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
    const el = this.getElement('[itemprop="articleBody"]');
    if (!el) return '';
    const article = el.cloneNode(true);
    const normalizedArticle = this.removeHtml(article);
    return normalizedArticle.textContent ? normalizedArticle.textContent.trim() : '';
  }
}
