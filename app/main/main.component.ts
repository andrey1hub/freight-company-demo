import { Component, OnInit } from '@angular/core';

import { LoadService } from '../load.service';
import { SettingsService } from '../settings.service';
import { UtilityService } from 'src/app/utility.service';
import { MainData } from '../models/main-data.system';
import { mainItemsData } from '../data/main-items';
import { MainItemStaticData } from '../models/main-item-static-data.system';
import { MainItemSelectableData } from '../models/main-item-selectable-data.system';
import { options } from '../data/options';
import { LoadsSummary } from '../models/loads-summary.public';
import { SettingsListData } from '../models/settings-list-data.system';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  mainData: MainData
  mainStaticItemsData: Array<Array<MainItemStaticData>> = UtilityService.uniqueCopy(mainItemsData.static)
  mainSelectableItemsData: Array<MainItemSelectableData> = UtilityService.uniqueCopy(mainItemsData.selectable)
  appName: string = UtilityService.APP_NAME
  appVersion: string = UtilityService.APP_VERSION

  constructor(private settingsService: SettingsService, private loadService: LoadService) { }

  ngOnInit(): void {
    this.settingsService.readSettings(
      (settingsData: SettingsListData) => {
        this.mainData = { ...this.mainData, ...UtilityService.uniqueCopy(options), ...settingsData }
      }
    )

    this.getLoadsSummary()
  }
  getLoadsSummary() {
    this.loadService.readLoadsSummary((summaryData: LoadsSummary) => {
      // Convert cm3 => m3
      summaryData.totalVolume = summaryData.totalVolume / 1000000
      this.mainData = { ...this.mainData, ...summaryData }
    })
  }

}
