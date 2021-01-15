import { Parser } from '../Parser';
import { PropParser } from '../PropParser';
import { Article, ArticleStatistic } from '../types';
import { User } from '../User';
import { Sender } from '../Sender';
import { addElement, msToSec } from '../utils';

export class Crawler {
  private readonly parser: Parser;
  private readonly article: Article;
  private readonly articleEl: HTMLElement | null;
  private readonly userId: string;
  private read: number;
  private readonly articleStartEl: HTMLElement | undefined;
  private readonly articleEndEl: HTMLElement | undefined;
  private startReadTime: number;
  private readonly sender: Sender;

  constructor() {
    this.parser = new PropParser();
    this.article = this.parser.result;
    this.articleEl = this.parser.articleElement;
    this.userId = User.getId();
    this.sender = new Sender();
    this.read = 0;
    this.articleStartEl = addElement(this.articleEl, 'js-observer-start', true);
    this.articleEndEl = addElement(this.articleEl, 'js-observer-end');
    this.startReadTime = new Date().getTime();
    this.initEvents();
  }

  get statistic(): ArticleStatistic {
    return {
      user: this.userId,
      domain: this.article.domain,
      slug: this.article.slug,
      time: msToSec(new Date().getTime() - this.startReadTime),
      read: this.read,
    };
  }

  sendArticleInfo(): void {
    this.sender.send(this.article, '/articles', false);
  }

  articleRead(): void {
    this.read = 1;
    this.sender.send(this.statistic, '/article-statistics', true);
  }

  articleReject(): void {
    this.sender.send(this.statistic, '/article-statistics', true);
  }

  setObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        if (entry.target === this.articleStartEl && !this.startReadTime) this.startReadTime = new Date().getTime();
        if (entry.target === this.articleEndEl && !this.read) this.articleRead();
      },
      {
        threshold: 1,
        rootMargin: '20px',
      }
    );
    if (this.articleStartEl) observer.observe(this.articleStartEl);
    if (this.articleEndEl) observer.observe(this.articleEndEl);
  }

  pageLeave(): void {
    window.addEventListener('beforeunload', () => !this.read && this.articleReject());
  }

  initEvents(): void {
    this.sendArticleInfo();
    this.setObserver();
    this.pageLeave();
  }
}
