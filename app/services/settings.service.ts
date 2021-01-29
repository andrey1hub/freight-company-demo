import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from './data.service';
import { AbstractStorageService } from './abstract-storage.service';
import { UtilityService } from './utility.service';
import { SettingsListIds } from 'src/app/models/settings-list-ids.system';
import { SettingEntryData } from 'src/app/models/setting-entry-data.public';
import { options } from 'src/app/data/options';
import { OptionItemData } from 'src/app/models/option-item-data.system';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { Data } from 'src/app/models/data.public';
import { SettingsRawData } from 'src/app/models/settings-raw-data.system';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends AbstractStorageService {
  static SERVICE_DATA_TYPE: string = 'settings'

  private convertDbEntriesToSettings(data: Array<SettingEntryData>): SettingsListData {
    let settingsListData: any = {}

    data = UtilityService.uniqueCopy(data)
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
  private convertSettingsToDbEntries(values: SettingsListIds, stack: Array<SettingEntryData>): Array<SettingEntryData> {
    let collection: Array<SettingEntryData> = []

    stack = UtilityService.uniqueCopy(stack)
    Object.keys(values).forEach(key => {
      let setting: SettingEntryData = stack.find(item => item.property === key)

      if (setting.modifier === 'checkbox') {
        setting.value = values[key] ? '1' : '0'
      } else {
        setting.value = values[key]
      }
      collection.push(setting)
    })
    return collection
  }

  constructor(private router: Router, private dataService: DataService) {
    super()
  }

  createSettings(handler: Function, data: SettingsRawData): void {
    let collection: Array<SettingEntryData> = this.convertSettingsToDbEntries(data.values, data.stack)

    this.processRequest(
      this.dataService.createRequest(SettingsService.SERVICE_DATA_TYPE, DataService.ENTITY_COLLECTION, collection),
      (ids: Array<string>) => {
        ids.forEach((id, index) => {
          collection[index].id = id
        })
        this.setStorage(collection)
        handler(this.convertDbEntriesToSettings(collection))
      }
    )
  }
  readSettings(handler: Function): void {
    let storage: Array<SettingEntryData> = this.getStorage()
    if (storage) {
      setTimeout(() => handler(this.convertDbEntriesToSettings(storage)), 0)
    } else {
      this.processRequest(
        this.dataService.readRequest(SettingsService.SERVICE_DATA_TYPE, DataService.ENTITY_COLLECTION, null),
        (response: Data<Array<SettingEntryData>>) => {
          let settingsData: SettingsListData = this.convertDbEntriesToSettings(response.data)

          if (settingsData.firstRunOfApp) {
            this.router.navigate(['system'])
            settingsData.firstRunOfApp = UtilityService.uniqueCopy(response.data)
          } else {
            this.setStorage(response.data)
          }
          handler(settingsData)
        }
      )
    }
  }
  updateSettings(handler: Function, data: SettingsListIds): void {
    let collection: Array<SettingEntryData> = this.convertSettingsToDbEntries(data, this.getStorage())

    this.processRequest(
      this.dataService.updateRequest(SettingsService.SERVICE_DATA_TYPE, DataService.ENTITY_COLLECTION, collection),
      (response: Array<string>) => {
        this.setStorage(collection)
        handler(response)
      }
    )
  }

  clearSettings(): void {
    this.setStorage(undefined)
    this.router.navigate(['system'])
  }
}
