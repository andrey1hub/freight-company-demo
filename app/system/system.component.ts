import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UtilityService } from 'src/app/services/utility.service';
import { systemMenu } from 'src/app/data/system-menu';
import { MenuBundle } from 'src/app/models/menu-bundle.system';
import { appData } from 'src/app/data/app';
import { MenuItem } from 'src/app/models/menu-item.system';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  menu: MenuBundle
  menuShow: boolean = false
  appName = appData.appName
  appVersion = appData.appVersion
  staticData = appData.system
  settings: SettingsListData
  systemMenuData: Array<MenuItem> = UtilityService.uniqueCopy(systemMenu)

  constructor(private settingsService: SettingsService, private router: Router) { }

  ngOnInit(): void {
    this.settingsService.readSettings(
      (settingsData: SettingsListData) => {
        this.settings = settingsData
      }
    )

    this.menu = UtilityService.buildMenu(this.systemMenuData, this.systemMenuData.findIndex(item => this.router.isActive(item.link, true)))
  }
  menuShowToggle(activeLinkId?: string): void {
    if (activeLinkId) this.menu.setLinkActive(activeLinkId)
    this.menuShow = !this.menuShow
  }

}
