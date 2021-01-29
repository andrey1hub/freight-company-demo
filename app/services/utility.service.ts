import { Injectable } from '@angular/core';

import { MenuItem } from 'src/app/models/menu-item.system';
import { MenuBundle } from 'src/app/models/menu-bundle.system';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
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
  static parseStringWithParams(string: string, handler: Function): string {
    let result: string
    let parsed: Array<string> = string.split(';;;')
    let values: any

    if (parsed?.length === 2 && handler && typeof handler === 'function') {
      result = parsed[0]
      values = handler(parsed[1].split(','))
      Object.keys(values).forEach(key => {
        result = result.split('%' + key + '%').join(values[key])
      })
    } else {
      result = string
    }
    return result
  }

  constructor() { }
}
