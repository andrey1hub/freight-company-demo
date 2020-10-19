import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { UtilityService } from 'src/app/utility.service';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractStorageService {
  storage: any

  constructor() { }

  processRequest(request: Observable<any>, handler: Function): void {
    let subscription: Subscription = request.subscribe({
      next(data) {
        handler(JSON.parse(data))
      },
      complete() {
        subscription.unsubscribe()
      }
    })
  }
  getStorage(): any {
    return UtilityService.uniqueCopy(this.storage)
  }
  setStorage(data: any): any {
    this.storage = UtilityService.uniqueCopy(data)
    return UtilityService.uniqueCopy(this.storage)
  }

}
