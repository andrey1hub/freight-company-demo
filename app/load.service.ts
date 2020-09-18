import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  private static SERVICE_DATA_TYPE: String = 'load'

  constructor(private dataService: DataService) { }

  createLoad(loadData: LoadRequestData): Observable<any> {
    return this.dataService.createRequest({
      type: LoadService.SERVICE_DATA_TYPE,
      data: loadData
    })
  }
  readLoad(loadId: String): Observable<any> {
    return this.dataService.readRequest(LoadService.SERVICE_DATA_TYPE, DataService.ENTITY_ENTRY, loadId)
  }
  updateLoad(loadData: LoadRequestData): Observable<any> {
    return this.dataService.updateRequest({
      type: LoadService.SERVICE_DATA_TYPE,
      data: loadData
    })
  }
  deleteLoad(loadId: String) {
    return this.dataService.deleteRequest(LoadService.SERVICE_DATA_TYPE, loadId)
  }

  readLoadsList(): Observable<any> {
    return this.dataService.readRequest(LoadService.SERVICE_DATA_TYPE, DataService.ENTITY_COLLECTION)
  }
  getLoadsSummary() {
    return this.dataService.readRequest(LoadService.SERVICE_DATA_TYPE, DataService.ENTITY_SUMMARY)
  }
}

export interface LoadRequestData {
  id?: String
  declaredCost: String
  fromDepartment: String
  height: String
  length: String
  packaging: String
  service: String
  toDepartment: String
  weight: String
  width: String
}
export interface LoadResponseEntryData {
  id: String
  declaredCost: String
  fromDepartment: LoadResponseEntrySelectedData
  height: String
  length: String
  packaging: LoadResponseEntrySelectedData
  service: LoadResponseEntrySelectedData
  toDepartment: LoadResponseEntrySelectedData
  weight: String
  width: String
  status: LoadResponseEntrySelectedData
  formed: String
}
export interface LoadResponseEntrySelectedData {
  id: String
  title: String
}
/* SUMMARY */
export interface LoadsSummary {
  totalRecords: Number
  totalInStorage: Number
  totalWeight: Number
  totalVolume: Number
  totalByDepartment: any
  totalByService: any
  totalByPackaging: any
}
