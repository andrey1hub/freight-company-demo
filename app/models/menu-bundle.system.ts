import { MenuItem } from './menu-item.system';

export interface MenuBundle {
  stack: Array<MenuItem>
  linksStatus: any
  setLinkActive: Function
}
