import { v4 as uuidv4 } from 'uuid';
import { Article, ArticleStatistic } from './types';

export const msToSec = (ms: number): number => Math.round(ms / 1000);

export const generateUniqueString = (): string => uuidv4();

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const tmp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return tmp.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');
};

export const addElement = (parentEl: HTMLElement | null, className: string, start = false): HTMLElement | undefined => {
  const element = document.createElement('div');
  element.classList.add(className);
  if (start) parentEl?.prepend(element);
  else parentEl?.appendChild(element);
  return element;
};

export const objectToFormData = (data: Article | ArticleStatistic): FormData =>
  Object.keys(data).reduce((formData, key) => {
    formData.append(key, (data as any)[key]);
    return formData;
  }, new FormData());
