import { Component, OnInit } from '@angular/core';

import { LoadService } from 'src/app/services/load.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MainData } from 'src/app/models/main-data.system';
import { mainItemsData } from 'src/app/data/main-items';
import { MainItemTextData } from 'src/app/models/main-item-text-data.system';
import { MainItemSelectableData } from 'src/app/models/main-item-selectable-data.system';
import { options } from 'src/app/data/options';
import { LoadsSummary } from 'src/app/models/loads-summary.public';
import { SettingsListData } from 'src/app/models/settings-list-data.system';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  mainData: MainData
  staticData: any = UtilityService.uniqueCopy(mainItemsData.static)
  mainTextItemsData: Array<Array<MainItemTextData>> = UtilityService.uniqueCopy(mainItemsData.text)
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
