import { Injectable } from '@angular/core';
import { DataService } from "./data.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private static SERVICE_DATA_TYPE: String = 'settings'

  constructor(private dataService: DataService) {}

  readSettings(): Observable<any> {
    return this.dataService.readRequest(SettingsService.SERVICE_DATA_TYPE, DataService.ENTITY_COLLECTION)
  }
  updateSettings(data: SettingsRequestData): Observable<any> {
    return this.dataService.updateRequest({
      type: SettingsService.SERVICE_DATA_TYPE,
      data
    })
  }
}

export interface SettingsRequestData {
  id: String
  property: String
  value: String
}
export interface SettingsListData {
  main: MainSettingsData
  departments: Array<SettingData>
  services: Array<SettingData>
  packagings: Array<SettingData>
  statuses: Array<SettingData>
}
export interface SettingData {
  id: String
  title: String
}
export interface MainSettingsData {
  currentDepartment: {
    id: String
    title: String
    dbRecordId: String
  },
  firstRunOfApp?: String
}
