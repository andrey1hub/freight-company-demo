import { BackendDBSettingsEntryData } from './models';
import { initialSettings } from './initial-settings';
import { ReadRequest } from './read-request';
import { DatabaseService } from './database.service';
import { UpdateRequest } from './update-request';
import { CreateRequest } from './create-request';

export class DatabasePatches {
  static patchDbRev_1(dbService: DatabaseService): void {
    let currentSettings: Array<{ id: string; property: string; value: string }> = (new ReadRequest(dbService)).readSettingsCollection({ action: 'read', type: 'settings', entity: 'collection', data: null }).data
    let updateSettings: Array<BackendDBSettingsEntryData> = []
    let createSettings: Array<BackendDBSettingsEntryData> = []

    initialSettings.forEach(initSetting => {
      currentSettings.forEach(currSetting => {
        if (initSetting.property === currSetting.property) {
          initSetting.id = currSetting.id
          initSetting.value = currSetting.value
          updateSettings.push(initSetting)
        } else {
          createSettings.push(initSetting)
        }
      })
    })

    ;(new UpdateRequest(dbService)).updateRowsList('settings', updateSettings)
    ;(new CreateRequest(dbService)).createRowsList('settings', createSettings)
  }
}
