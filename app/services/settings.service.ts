import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { AbstractStorageService } from './abstract-storage.service';
import { UtilityService } from './utility.service';
import { SettingsListIds } from 'src/app/models/settings-list-ids.system';
import { SettingEntryData } from 'src/app/models/setting-entry-data.public';
import { options } from 'src/app/data/options';
import { OptionItemData } from 'src/app/models/option-item-data.system';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { Data } from 'src/app/models/data.public';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends AbstractStorageService {
  static SERVICE_DATA_TYPE: string = 'settings'

  private convertDbEntriesToSettings(data: Array<SettingEntryData>): SettingsListData {
    let settingsListData: any = {}

    data.forEach(setting => {
      let settingData: OptionItemData | boolean | string | number

      switch (setting.modifier) {
        case 'select':
          settingData = {
            id: setting.value,
            title: UtilityService.uniqueCopy(options)[setting.stackId].find((item: OptionItemData) => item.id === setting.value).title
          }
          break;

        case 'checkbox':
          settingData = !!parseInt(setting.value)
          break;

        case 'range':
          settingData = parseInt(setting.value)
          break;

        case 'text':
          settingData = setting.value
          break;

        default:
          break;
      }
      settingsListData[setting.property] = settingData
    })

    return settingsListData
  }

  constructor(private dataService: DataService) {
    super()
  }

  readSettings(handler: Function): void {
    let storage: Array<SettingEntryData> = this.getStorage()
    if (storage) {
      setTimeout(() => handler(this.convertDbEntriesToSettings(storage)), 0)
    } else {
      this.processRequest(
        this.dataService.readRequest(SettingsService.SERVICE_DATA_TYPE, DataService.ENTITY_COLLECTION, null),
        (response: Data<Array<SettingEntryData>>) => {
          this.setStorage(response.data)
          handler(this.convertDbEntriesToSettings(response.data))
        }
      )
    }
  }
  updateSettings(handler: Function, data: SettingsListIds): void {
    let storage: Array<SettingEntryData> = this.getStorage()

    Object.keys(data).forEach(key => {
      storage.find(entry => {
        if (entry.property === key) {
          if (entry.modifier === 'checkbox') {
            entry.value = data[key] ? '1' : '0'
          } else {
            entry.value = data[key]
          }
          return true
        }
      })
    })

    this.processRequest(
      this.dataService.updateRequest(SettingsService.SERVICE_DATA_TYPE, DataService.ENTITY_COLLECTION, storage),
      (response: Array<string>) => {
        if (response && response.length) this.setStorage(storage)
        handler(response)
      }
    )
  }
}
