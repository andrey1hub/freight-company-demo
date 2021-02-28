import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { AbstractStorageService } from './abstract-storage.service';
import { LoadsFilterService } from './loads-filter.service';
import { LoadEntryData } from 'src/app/models/load-entry-data.public';
import { FilterLoadsData } from 'src/app/models/filter-loads-data.system';
import { LoadEntryFullData } from 'src/app/models/load-entry-full-data.public';
import { LoadsSummary } from 'src/app/models/loads-summary.public';
import { Data } from 'src/app/models/data.public';
import { EntryData } from 'src/app/models/entry-data.public';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class LoadService extends AbstractStorageService {
  static SERVICE_DATA_TYPE: string = 'load'

  private idsStorage: Array<string>

  constructor(private dataService: DataService) {
    super()
  }

  createLoad(handler: Function, data: LoadEntryData): void {
    this.processRequest(
      this.dataService.createRequest(LoadService.SERVICE_DATA_TYPE, DataService.ENTITY_ENTRY, data),
      handler
    )
  }
  readLoad(handler: Function, data: EntryData): void {
    this.processRequest(
      this.dataService.readRequest(LoadService.SERVICE_DATA_TYPE, DataService.ENTITY_ENTRY, data),
      (response: Data<LoadEntryFullData>) => {
        handler(response.data)
      }
    )
  }
  updateLoad(handler: Function, data: LoadEntryData): void {
    this.processRequest(
      this.dataService.updateRequest(LoadService.SERVICE_DATA_TYPE, DataService.ENTITY_ENTRY, data),
      handler
    )
  }
  deleteLoad(handler: Function, data: EntryData): void {
    this.processRequest(
      this.dataService.deleteRequest(LoadService.SERVICE_DATA_TYPE, data),
      handler
    )
  }

  readLoadsList(handler: Function): void {
    this.processRequest(
      this.dataService.readRequest(LoadService.SERVICE_DATA_TYPE, DataService.ENTITY_COLLECTION, null),
      (response: Data<Array<LoadEntryFullData>>) => {
        this.setStorage(response.data)
        this.idsStorage = response.data.map(entry => entry.id)
        handler(response.data)
      }
    )
  }
  readLoadsSummary(handler: Function): void {
    this.processRequest(
      this.dataService.readRequest(LoadService.SERVICE_DATA_TYPE, DataService.ENTITY_SUMMARY, null),
      (response: Data<LoadsSummary>) => {
        handler(response.data)
      }
    )
  }

  getFilteredLoadsList(handler: Function, filter: FilterLoadsData): void {
    let filteredData: Array<LoadEntryFullData> = this.getStorage().filter((entry: LoadEntryFullData) => {
      let checkStack: Array<boolean> = []

      Object.keys(filter).forEach(key => {
        if (filter[key]) {
          if (key === 'id') {
            checkStack.push(filter[key].toLowerCase() === entry[key].toLowerCase().substr(0, filter[key].length))
          } else if (key === 'formedAfter') {
            checkStack.push(filter[key].getTime() < parseInt(entry.formed))
          } else if (key === 'formedBefore') {
            // Make 23:59:59.999 of the given date to include it in filter scope
            checkStack.push((filter[key].getTime() + 24 * 60 * 60 * 1000 - 1) > parseInt(entry.formed))
          } else {
            checkStack.push(filter[key] === LoadsFilterService.FILTER_ANY_OPTION_ID || filter[key] === entry[key].id)
          }
        }
      })

      return checkStack.every(check => check)
    })

    this.idsStorage = filteredData.map(entry => entry.id)
    handler(filteredData)
  }
  getLoadsIds(handler: Function): void {
    if (this.idsStorage) {
      handler(this.idsStorage)
    } else {
      this.readLoadsList(() => {
        handler(this.idsStorage)
      })
    }
  }

}
