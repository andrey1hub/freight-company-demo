import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { AbstractStorageService } from './abstract-storage.service';
import { UtilityService } from 'src/app/utility.service';
import { LoadEntryData } from './models/load-entry-data.public';
import { FilterLoadsData } from './models/filter-loads-data.system';
import { LoadEntryFullData } from './models/load-entry-full-data.public';
import { LoadsSummary } from './models/loads-summary.public';
import { Data } from 'src/app/models/data.public';

@Injectable({
  providedIn: 'root'
})
export class LoadService extends AbstractStorageService {
  static SERVICE_DATA_TYPE: string = 'load'

  constructor(private dataService: DataService) {
    super()
  }

  createLoad(handler: Function, data: LoadEntryData): void {
    this.processRequest(
      this.dataService.createRequest(LoadService.SERVICE_DATA_TYPE, data),
      handler
    )
  }
  readLoad(handler: Function, data: { id: string }): void {
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
  deleteLoad(handler: Function, data: { id: string }): void {
    this.processRequest(
      this.dataService.deleteRequest(LoadService.SERVICE_DATA_TYPE, data),
      handler
    )
  }

  readLoadsList(handler: Function): void {
    this.processRequest(
      this.dataService.readRequest(LoadService.SERVICE_DATA_TYPE, DataService.ENTITY_COLLECTION, {}),
      (response: Data<Array<LoadEntryFullData>>) => {
        this.setStorage(response.data)
        handler(response.data)
      }
    )
  }
  readLoadsSummary(handler: Function): void {
    this.processRequest(
      this.dataService.readRequest(LoadService.SERVICE_DATA_TYPE, DataService.ENTITY_SUMMARY, {}),
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
          if (key !== 'id' && key !== 'formedAfter' && key !== 'formedBefore') {
            checkStack.push(filter[key] === UtilityService.FILTER_ANY_OPTION_ID || filter[key] === entry[key].id)
          } else if (key === 'id') {
            checkStack.push(filter[key].toLowerCase() === entry[key].toLowerCase().substr(0, filter[key].length))
          } else if (key === 'formedAfter') {
            checkStack.push(filter[key].getTime() < parseInt(entry.formed))
          } else if (key === 'formedBefore') {
            // Make 23:59:59.999 of the given date to include it in filter scope
            checkStack.push((filter[key].getTime() + 24 * 60 * 60 * 1000 - 1) > parseInt(entry.formed))
          }
        }
      })

      return checkStack.every(check => check) && entry
    })

    handler(filteredData)
  }
}
