import { Component } from '@angular/core';

import { appMenu } from 'src/app/data/app-menu';
import { MenuBundle } from 'src/app/models/menu-bundle.system';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menu: MenuBundle = UtilityService.buildMenu(appMenu)

  constructor() { }

}
