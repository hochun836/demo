import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  scrollTo(element: HTMLElement): void {
    window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
  }

  openWindow(url: string, target?: string, features?: string, windowList?: (Window | null)[]): void {
    // compatible with safari
    setTimeout(() => {
      const _window = window.open(url, target, features);
      if (windowList) {
        windowList.push(_window);
      }
    });
  }

  download(url: string, downloadName?: string): void {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute('download', downloadName ?? url.split('/').at(-1)); // 沒有 download 的話，則會先另開視窗再下載
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
