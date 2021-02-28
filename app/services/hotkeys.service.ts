import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotkeysService {
  private provider = new Subject<KeyboardEvent>()

  constructor() {
    document.addEventListener('keyup', e => this.provider.next(e))
  }

  subscribe(keys: Array<string>, handler: Function): Subscription {
    return this.provider.subscribe({
      next: e => {
        if (keys.includes(e.code) && (e.target as HTMLElement).tagName !== 'INPUT') handler(e)
      }
    })
  }
}
