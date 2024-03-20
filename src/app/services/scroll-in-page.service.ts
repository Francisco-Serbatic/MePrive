import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollInPageService {

  constructor() { }

  scrollToTarget(targetId: string): void {
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
