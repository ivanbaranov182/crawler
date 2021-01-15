import { Article, ArticleStatistic } from '../types';
import { objectToFormData } from '../utils';

const { API_URL = 'http://localhost/api/v1' } = process.env;

console.log('API_URL', API_URL);

export class Sender {
  private readonly canBeacon: boolean;
  constructor() {
    this.canBeacon = !!navigator.sendBeacon;
  }

  getApiUrl(url: string): string {
    return `${API_URL}${url}`;
  }

  send(data: Article | ArticleStatistic, url: string, preferBeacon = false): boolean | void {
    if (this.canBeacon && preferBeacon) return this.sendBeacon(data, url);
    this.fetch(data, url);
  }

  sendBeacon(data: Article | ArticleStatistic, url: string): boolean {
    return navigator.sendBeacon(this.getApiUrl(url), objectToFormData(data));
  }

  fetch(data: Article | ArticleStatistic, url: string): void {
    const opts: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    void fetch(this.getApiUrl(url), opts);
  }
}
