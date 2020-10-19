import { Injectable } from '@angular/core';

import { MenuItem } from './models/menu-item.system';
import { MenuBundle } from 'src/app/models/menu-bundle.system';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  static APP_NAME: string = 'Freight Company Demo'
  static APP_VERSION: string = 'v1.3.0'

  static FILTER_AUDIT_TIME: number = 200
  static FILTER_ANY_OPTION_ID: string = 'filter-any-option'
  static FILTER_ANY_OPTION_TITLE: string = 'Any'

  static uniqueCopy(data: any): any {
    return data && JSON.parse(JSON.stringify(data))
  }
  static buildMenu(data: Array<MenuItem>, initActive?: number): MenuBundle {
    let menuBundle: any = {
      stack: data.map(item => ({
        id: item.link.split('/').join('_'),
        label: item.label,
        link: item.link
      })),
      linksStatus: {},
      setLinkActive: (id: string) => {
        Object.keys(menuBundle.linksStatus).forEach(key => {
          menuBundle.linksStatus[key] = false
        })

        menuBundle.linksStatus[id] = true
      }
    }

    menuBundle.stack.forEach((item: MenuItem, index: number) => {
      menuBundle.linksStatus[item.id] = typeof initActive === 'number' && initActive >= 0 ? index === initActive : false
    })

    return menuBundle
  }

  constructor() { }
}
