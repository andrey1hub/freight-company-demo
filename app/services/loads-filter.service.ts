import { Injectable } from '@angular/core';

import { AbstractStorageService } from './abstract-storage.service';
import { FilterLoadsData } from 'src/app/models/filter-loads-data.system';

@Injectable({
  providedIn: 'root'
})
export class LoadsFilterService extends AbstractStorageService {
  static FILTER_AUDIT_TIME: number = 200
  static FILTER_ANY_OPTION_ID: string = 'filter-any-option'
  static FILTER_ANY_OPTION_TITLE: string = 'Any'
  static FILTER_DEFAULT_VALUE: FilterLoadsData = {
    id: '',
    formedAfter: null,
    formedBefore: null,
    fromDepartment: LoadsFilterService.FILTER_ANY_OPTION_ID,
    toDepartment: LoadsFilterService.FILTER_ANY_OPTION_ID,
    service: LoadsFilterService.FILTER_ANY_OPTION_ID,
    packaging: LoadsFilterService.FILTER_ANY_OPTION_ID
  }

  private static HISTORY_MIN_SIZE: number = 1
  private static HISTORY_MAX_SIZE: number = 100

  private historySize: number = LoadsFilterService.HISTORY_MIN_SIZE
  private defaultQuery: boolean = false

  constructor() {
    super()
  }

  setHistorySize(size: number): void {
    if (size && size > 0 && size <= LoadsFilterService.HISTORY_MAX_SIZE) {
      this.historySize = size
    }
  }
  saveFilterQuery(data: FilterLoadsData): void {
    let history: Array<FilterLoadsData>

    if (JSON.stringify(data) === JSON.stringify(LoadsFilterService.FILTER_DEFAULT_VALUE)) {
      this.defaultQuery = true
    } else {
      history = this.getFilterHistory()
      history.unshift(data)
      history = history.slice(0, this.historySize)
      this.setStorage(history)
      this.defaultQuery = false
    }
  }
  getFilterHistory(): Array<FilterLoadsData> {
    return this.getStorage() || []
  }
  getFilterQuery(index: number): FilterLoadsData {
    let history: Array<FilterLoadsData> = this.getFilterHistory()
    return history.length && index >= 0 && index < history.length && history[index] || null
  }
  getLastFilterQuery(): FilterLoadsData {
    return !this.defaultQuery && this.getFilterQuery(0) || null
  }

}
