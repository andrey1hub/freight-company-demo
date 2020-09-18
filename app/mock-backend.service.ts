import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { options } from './options';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {
  private db: Storage = window.localStorage
  private mockUIDGenerator(): String {
    let letters: Array<String> = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    let uid: String = ''
    for (let i = 1; i <= 10; i++) {
      uid = uid.concat(letters[Math.floor(Math.random() * 52)] as string)
    }
    return uid
  }
  private mockResponseDelay(f: Function) {
    // setTimeout(f, 1000)
    setTimeout(f, 0)
  }
  private createRow(requestData: RequestData): String {
    let raw: String = this.readDBTable(requestData.type)
    let parsed: Array<Object>
    let id: String = this.mockUIDGenerator()

    if (!raw) {
      parsed = []
    } else {
      parsed = JSON.parse(raw as string)
    }
    parsed.push({ ...requestData.data, id })
    this.updateDBTable(requestData.type, JSON.stringify(parsed))

    return id
  }
  private createRowsList(parsed: Array<DBEntryData>): Array<DBEntryData> {
    return parsed.map(item => {
      item.id = this.createRow({
        action: 'create',
        type: 'settings',
        entity: 'entry',
        data: item
      })
      return item
    })
  }
  private readRow(table: String, id: String): DBEntryData {
    let raw: String = this.readDBTable(table)
    let parsed: Array<DBEntryData>
    let entry: DBEntryData

    if (raw) {
      parsed = JSON.parse(raw as string)
      entry = this.getCollectionEntryById(parsed, id)
    }
    return entry
  }
  private updateRow(requestData: RequestEntryData): String {
    let raw: String = this.readDBTable(requestData.type)
    let parsed: Array<Object>

    parsed = JSON.parse(raw as string).map((item: DBEntryData) =>
      (item.id === requestData.data.id ? requestData.data : item)
    )
    this.updateDBTable(requestData.type, JSON.stringify(parsed))
    return requestData.data.id
  }
  private deleteRow(requestData: RequestEntryData): Boolean {
    let raw: String = this.readDBTable(requestData.type)
    let parsed: Array<Object>

    parsed = JSON.parse(raw as string).map((item: DBEntryData) =>
      (item.id === requestData.data.id ? false : item)
    ).filter((item: DBLoadEntryData) => item)
    this.updateDBTable(requestData.type, JSON.stringify(parsed))
    return true
  }
  private readDBTable(name: String): String {
    return this.db.getItem(name as string) as String
  }
  private updateDBTable(name: String, stringified: String) {
    this.db.setItem(name as string, stringified as string)
  }
  private createAnyTypeRow(requestData: RequestData): String {
    switch (requestData.type) {
      case 'settings':
        return this.createRow(requestData)
        break;

      case 'load':
        return this.createLoadRow(requestData)
        break;

      default:
        break;
    }
  }
  private createLoadRow(requestData: RequestEntryData): String {
    requestData.data.formed = '' + (new Date()).getTime()
    requestData.data.status = '1'
    return this.createRow(requestData)
  }
  private readAnyTypeAnyEntity(requestData: RequestData): ResponseData {
    switch (requestData.entity) {
      case 'collection':
        return this.readCollectionData(requestData)
        break;

      case 'entry':
        return this.readEntryData(requestData)
        break;

      case 'summary':
        return this.readSummaryData(requestData)
        break;

      default:
        break;
    }
  }
  private readCollectionData(requestData: RequestData): ResponseCollectionData {
    let raw: String = this.readDBTable(requestData.type)
    let parsed: Array<any> = JSON.parse(raw as string)
    switch (requestData.type) {
      case 'settings':
        return {
          type: requestData.type,
          data: {
            main: this.getSettingsEntriesWithTitles(parsed),
            departments: options.departments,
            services: options.services,
            packagings: options.packagings,
            statuses: options.statuses
          }
        } as ResponseSettingsCollectionData
        break;

      case 'load':
        return {
          type: requestData.type,
          data: this.getLoadEntriesWithTitles(parsed)
        } as ResponseLoadCollectionData
        break;

      default:
        break;
    }
  }
  private readEntryData(requestData: RequestEntryData): ResponseEntryData {
    switch (requestData.type) {
      case 'settings':
        return null
        break;

      case 'load':
        return this.getLoadEntryData(
          this.readRow(requestData.type, requestData.data.id) as DBLoadEntryData
        )
        break;

      default:
        break;
    }
  }
  private readSummaryData(requestData: RequestData): any {
    switch (requestData.type) {
      case 'settings':
        return null
        break;

      case 'load':
        return this.getLoadsSummary(requestData.type)
        break;

      default:
        break;
    }
  }
  private getLoadEntryData(entry: DBLoadEntryData): ResponseLoadEntryData {
    if (!entry) return null
    let settings: ResponseSettingsCollectionData = this.getSettings()
    return {
      id: entry.id,
      data: {
        status: this.getCollectionEntryById(settings.data.statuses, entry.status),
        formed: entry.formed,
        fromDepartment: this.getCollectionEntryById(settings.data.departments, entry.fromDepartment),
        toDepartment: this.getCollectionEntryById(settings.data.departments, entry.toDepartment),
        service: this.getCollectionEntryById(settings.data.services, entry.service),
        packaging: this.getCollectionEntryById(settings.data.packagings, entry.packaging),
        length: entry.length,
        width: entry.width,
        height: entry.height,
        weight: entry.weight,
        declaredCost: entry.declaredCost
      }
    }
  }
  private getSettingsEntriesWithTitles(parsed: Array<DBSettingsEntryData>): ResponseMainSettingsData {
    let main: any = {}

    if (!parsed || !parsed.length) {
      main.firstRunOfApp = 'yes'
      parsed = this.createRowsList(options.main) as Array<DBSettingsEntryData>
    }
    parsed.forEach(entry => {
      let propertyData = this.getCollectionEntryById(options.departments, entry.value)
      main[entry.property as string] = { ...propertyData, dbRecordId: entry.id }
    })
    return main
  }
  private getLoadEntriesWithTitles(collection: Array<DBLoadEntryData>): Array<ResponseLoadCollectionEntry> {
    let settings: ResponseSettingsCollectionData = this.getSettings()

    if (!collection) collection = []
    return collection.map(entry => ({
      status: this.getCollectionEntryById(settings.data.statuses, entry.status),
      formed: entry.formed,
      id: entry.id,
      fromDepartment: this.getCollectionEntryById(settings.data.departments, entry.fromDepartment),
      toDepartment: this.getCollectionEntryById(settings.data.departments, entry.toDepartment),
      service: this.getCollectionEntryById(settings.data.services, entry.service),
      packaging: this.getCollectionEntryById(settings.data.packagings, entry.packaging),
      length: entry.length,
      width: entry.width,
      height: entry.height,
      weight: entry.weight,
      declaredCost: entry.declaredCost
    }))
  }
  private getLoadsSummary(tableName: String): any {
    let raw: String = this.readDBTable(tableName)
    let parsed: Array<DBLoadEntryData> = JSON.parse(raw as string)
    let summary: any = {}

    summary.totalRecords = parsed && parsed.length || 0
    summary.totalInStorage = 0
    summary.totalWeight = 0
    summary.totalVolume = 0
    summary.totalByDepartment = {}
    summary.totalByService = {}
    summary.totalByPackaging = {}
    if (parsed && parsed.length) {
      parsed.forEach(entry => {
        if (entry.status === '1') {
          summary.totalInStorage++

          summary.totalWeight += parseFloat(entry.weight as string)
          summary.totalVolume += parseFloat(entry.length as string) * parseFloat(entry.width as string) * parseFloat(entry.height as string)

          if (summary.totalByDepartment[entry.toDepartment as string]) {
            summary.totalByDepartment[entry.toDepartment as string]++
          } else {
            summary.totalByDepartment[entry.toDepartment as string] = 1
          }
          if (summary.totalByService[entry.service as string]) {
            summary.totalByService[entry.service as string]++
          } else {
            summary.totalByService[entry.service as string] = 1
          }
          if (summary.totalByPackaging[entry.packaging as string]) {
            summary.totalByPackaging[entry.packaging as string]++
          } else {
            summary.totalByPackaging[entry.packaging as string] = 1
          }
        }
      })
    }
    return summary
  }
  private getSettings(): ResponseSettingsCollectionData {
    return this.readAnyTypeAnyEntity({
      type: 'settings',
      action: 'read',
      entity: 'collection',
      data: {}
    }) as ResponseSettingsCollectionData
  }
  private getCollectionEntryById(collection: Array<any>, id: String): any {
    return collection.find(item => item.id === id)
  }

  constructor() { }

  mockRequest(requestData: RequestData): Observable<any> {
    let scope: MockBackendService = this
    let action: Function
    return new Observable(subscriber => {
      switch (requestData.action) {
        case 'create':
          action = () => scope.createAnyTypeRow(requestData)
          break;

        case 'read':
          action = () => scope.readAnyTypeAnyEntity(requestData)
          break;

        case 'update':
          action = () => scope.updateRow(requestData)
          break;

        case 'delete':
          action = () => scope.deleteRow(requestData)
          break;

        default:
          break;
      }
      scope.mockResponseDelay(() => {
        subscriber.next(action())
        subscriber.complete()
      })
    })
  }
}
/* DB DATA */
interface DBEntryData {
  id: String
}
interface DBLoadEntryData extends DBEntryData {
  status: String
  formed: String
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
interface DBSettingsEntryData extends DBEntryData {
  property: String
  value: String
}
/* REQUEST */
interface RequestData {
  action: String
  type: String
  entity: String
  data: any
}
interface RequestEntryData extends RequestData {
  data: {
    id: String
    formed: String
    status: String
  }
}
/* RESPONSE */
interface ResponseData {
  data: any
}
/* entry */
interface ResponseEntryData extends ResponseData {
  id: String
}
interface ResponseLoadEntryData extends ResponseEntryData {
  data: {
    status: String
    formed: String
    declaredCost: String
    fromDepartment: ResponseLoadSelectedData
    height: String
    length: String
    packaging: ResponseLoadSelectedData
    service: ResponseLoadSelectedData
    toDepartment: ResponseLoadSelectedData
    weight: String
    width: String
  }
}
interface ResponseLoadSelectedData {
  id: String
  title: String
}
/* collection */
interface ResponseCollectionData extends ResponseData {
  type: String
}
interface ResponseLoadCollectionData extends ResponseCollectionData {
  data: Array<ResponseLoadCollectionEntry>
}
interface ResponseLoadCollectionEntry {
  id: String
  declaredCost: String
  fromDepartment: ResponseLoadSelectedData
  height: String
  length: String
  packaging: ResponseLoadSelectedData
  service: ResponseLoadSelectedData
  toDepartment: ResponseLoadSelectedData
  weight: String
  width: String
  status: ResponseLoadSelectedData
  formed: String
}
interface ResponseSettingsCollectionData extends ResponseCollectionData {
  data: {
    main: ResponseMainSettingsData
    departments: Array<ResponseSettingsEntryData>
    services: Array<ResponseSettingsEntryData>
    packagings: Array<ResponseSettingsEntryData>
    statuses: Array<ResponseSettingsEntryData>
  }
}
interface ResponseSettingsEntryData {
  id: String
  title: String
}
interface ResponseMainSettingsData {
  currentDepartment: {
    id: String
    title: String
    dbRecordId: String
  }
}
