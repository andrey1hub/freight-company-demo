import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';

import { options } from './data/options';

const initialSettings: Array<DBSettingsEntryData> = [
  {
    id: '',
    property: 'currentDepartment',
    modifier: 'select',
    stackId: 'departments',
    value: '1982543442'
  },
  {
    id: '',
    property: 'unitsSystem',
    modifier: 'select',
    stackId: 'unitsSystems',
    value: 'mkg'
  },
  {
    id: '',
    property: 'showLoadsFilter',
    modifier: 'checkbox',
    stackId: '',
    value: '1'
  },
  {
    id: '',
    property: 'keepFilterQuery',
    modifier: 'checkbox',
    stackId: '',
    value: '0'
  },
  {
    id: '',
    property: 'loadsNavButtons',
    modifier: 'checkbox',
    stackId: '',
    value: '0'
  },
  {
    id: '',
    property: 'buttonsHotkeys',
    modifier: 'checkbox',
    stackId: '',
    value: '0'
  }
]
const DB_REVISION: number = 2

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {
  private validDbRevisions: Array<number> = [1, 2]
  private db: Storage = window.localStorage
  private checkAndPatchDb(): boolean {
    let dbRev: number = parseInt(this.readDBTable('DB_REVISION') || '0')
    let check: boolean = false

    if (!dbRev) {
      if (this.readDBTable('settings')) {
        this.patchDb(1)
      } else {
        this.updateDBTable('DB_REVISION', '' + DB_REVISION)
      }
      check = true
    } else {
      if (this.validDbRevisions.includes(dbRev)) {
        if (dbRev !== DB_REVISION) this.patchDb(dbRev)
        check = true
      }
    }
    return check
  }
  private patchDb(revision: number): void {
    let patchFnName: string = 'patchDbRev_' + revision
    this[patchFnName] && typeof this[patchFnName] === 'function' && this[patchFnName]()
    this.updateDBTable('DB_REVISION', '' + DB_REVISION)
  }
  private patchDbRev_1(): void {
    let currentSettings: Array<{ id: string; property: string; value: string }> = this.getSettingsCollection().data
    let updateSettings: Array<DBSettingsEntryData> = []
    let createSettings: Array<DBSettingsEntryData> = []

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

    this.updateRowsList('settings', updateSettings)
    this.createRowsList('settings', createSettings)
  }
  private unique(data: any): any {
    return data && JSON.parse(JSON.stringify(data))
  }
  private mockUIDGenerator(): string {
    let letters: Array<string> = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    let uid: string = ''
    for (let i = 1; i <= 10; i++) {
      uid = uid.concat(this.randomItemOfStackPicker(letters))
    }
    return uid
  }
  private mockResponseDelay(f: Function) {
    setTimeout(f, 1000)
    // setTimeout(f, 0)
  }
  private randomItemOfStackPicker(stack: Array<any> | number): any {
    return typeof stack === 'number' ? Math.floor(Math.random() * stack) + 1 : stack.length && stack[Math.floor(Math.random() * stack.length)]
  }
  private execCommand(requestData: RequestCommandData): boolean {
    switch (requestData.data.command) {
      case 'generate':
        return this.processGenerateComm(requestData.type, requestData.data.options)
        break;

      default:
        return null
        break;
    }
  }
  private processGenerateComm(type: string, commandOptions: CommandOptions): boolean {
    if (
      commandOptions.formedSpanStart && commandOptions.formedSpanEnd &&
      commandOptions.formedSpanStart.getTime() > commandOptions.formedSpanEnd.getTime()
    ) commandOptions.formedSpanStart = null
    let formedSpanEnd: Date = commandOptions.formedSpanEnd || new Date()
    let formedSpanStart: Date = commandOptions.formedSpanStart || new Date(formedSpanEnd.getTime() - 30 * 24 * 60 * 60 * 1000)
    let quantity: number = commandOptions.quantity || 100
    let dbIdPrefix: string = commandOptions.dbIdPrefix || 'demo'
    let collection: Array<DBLoadEntryData> = []
    let ids: Array<string> = []
    let settingsFromDB: ResponseSettingsCollectionData = this.getSettingsCollection()
    let currentDepartment: string = settingsFromDB.data.find(item => item.property === 'currentDepartment').value

    for (let i = 0; i < quantity; i++) {
      let fromDepartment: string = this.randomItemOfStackPicker(options.departments).id
      let toDepartment: string
      let entry: any

      if (fromDepartment === currentDepartment) {
        toDepartment = this.randomItemOfStackPicker(options.departments).id
      } else {
        toDepartment = currentDepartment
      }

      entry = {
        status: '1',
        formed: '' + (formedSpanStart.getTime() + this.randomItemOfStackPicker(formedSpanEnd.getTime() - formedSpanStart.getTime())),
        fromDepartment: fromDepartment,
        toDepartment: toDepartment,
        packaging: this.randomItemOfStackPicker(options.packagings).id,
        service: this.randomItemOfStackPicker(options.services).id,
        declaredCost: '' + this.randomItemOfStackPicker(100000),
        height: '' + this.randomItemOfStackPicker(1000),
        length: '' + this.randomItemOfStackPicker(1000),
        weight: '' + this.randomItemOfStackPicker(1000),
        width: '' + this.randomItemOfStackPicker(1000)
      }
      collection.push(entry)
    }
    ids = this.createRowsList(type, collection, dbIdPrefix, 'formed').map(item => item.id)

    return ids.length === collection.length
  }
  private createRow(requestData: RequestData, dbIdPrefix?: string, sortType?: string): string {
    let raw: string = this.readDBTable(requestData.type)
    let parsed: Array<DBEntryData>
    let id: string = this.mockUIDGenerator()
    let sortHandlers: SortHandlers = {
      formed: (first: DBLoadEntryData, second: DBLoadEntryData) => parseInt(first.formed) - parseInt(second.formed)
    }

    if (!raw) {
      parsed = []
    } else {
      parsed = JSON.parse(raw)
    }
    if (dbIdPrefix) id = dbIdPrefix.concat('_').concat(id)

    parsed.push({ ...requestData.data, id })

    if (typeof sortType === 'string' &&
      typeof sortHandlers[sortType] === 'function') parsed.sort(sortHandlers[sortType])

    this.updateDBTable(requestData.type, JSON.stringify(parsed))

    return id
  }
  private createRowsList(type: string, parsed: Array<DBEntryData>, dbIdPrefix?: string, sortType?: string): Array<DBEntryData> {
    return this.unique(parsed).map((data: DBEntryData) => {
      data.id = this.createRow({
        action: 'create',
        type,
        entity: 'entry',
        data
      }, dbIdPrefix, sortType)
      return data
    })
  }
  private readRow(table: string, id: string): DBEntryData {
    let raw: string = this.readDBTable(table)
    let parsed: Array<DBEntryData>
    let entry: DBEntryData

    if (raw) {
      parsed = JSON.parse(raw)
      entry = this.getCollectionEntryById(parsed, id)
    }
    return entry
  }
  private updateRow(requestData: RequestEntryData): string {
    let raw: string = this.readDBTable(requestData.type)
    let parsed: Array<DBEntryData>

    parsed = JSON.parse(raw).map((item: DBEntryData) =>
      (item.id === requestData.data.id ? requestData.data : item)
    )
    this.updateDBTable(requestData.type, JSON.stringify(parsed))
    return requestData.data.id
  }
  private updateRowsList(type: string, parsed: Array<DBEntryData>): Array<string> {
    return parsed.map(data => this.updateRow({
      action: 'update',
      type,
      entity: 'entry',
      data
    }))
  }
  private deleteRow(requestData: RequestEntryData): boolean {
    let raw: string = this.readDBTable(requestData.type)
    let parsed: Array<DBEntryData>

    parsed = JSON.parse(raw).filter((item: DBEntryData) =>
      (item.id === requestData.data.id ? false : item)
    )
    this.updateDBTable(requestData.type, JSON.stringify(parsed))
    return true
  }
  private readDBTable(name: string): string {
    return this.db.getItem(name)
  }
  private updateDBTable(name: string, stringified: string) {
    this.db.setItem(name, stringified)
  }
  private createAnyTypeRow(requestData: RequestData): string {
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
  private createLoadRow(requestData: RequestLoadEntryData): string {
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
    let raw: string = this.readDBTable(requestData.type)
    let parsed: Array<any> = JSON.parse(raw)
    switch (requestData.type) {
      case 'settings':
        return {
          type: requestData.type,
          data: this.getInitialSettingsIfEmpty(parsed)
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
  private readSummaryData(requestData: RequestData): ResponseData {
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
    if (!entry) return {
      id: null,
      data: null
    }
    return {
      id: entry.id,
      data: {
        id: entry.id,
        status: this.getCollectionEntryById(this.unique(options).statuses, entry.status),
        formed: entry.formed,
        fromDepartment: this.getCollectionEntryById(this.unique(options).departments, entry.fromDepartment),
        toDepartment: this.getCollectionEntryById(this.unique(options).departments, entry.toDepartment),
        service: this.getCollectionEntryById(this.unique(options).services, entry.service),
        packaging: this.getCollectionEntryById(this.unique(options).packagings, entry.packaging),
        length: entry.length,
        width: entry.width,
        height: entry.height,
        weight: entry.weight,
        declaredCost: entry.declaredCost
      }
    }
  }
  private getInitialSettingsIfEmpty(parsed: Array<DBSettingsEntryData>): Array<DBSettingsEntryData> {
    if (!parsed || !parsed.length) {
      parsed = this.createRowsList('settings', initialSettings) as Array<DBSettingsEntryData>
      parsed.push({
        id: '',
        property: 'firstRunOfApp',
        modifier: 'text',
        stackId: '',
        value: 'yes'
      })
    }
    return parsed
  }
  private getLoadEntriesWithTitles(collection: Array<DBLoadEntryData>): Array<ResponseLoadCollectionEntry> {
    if (!collection) collection = []
    return collection.map(entry => ({
      status: this.getCollectionEntryById(this.unique(options).statuses, entry.status),
      formed: entry.formed,
      id: entry.id,
      fromDepartment: this.getCollectionEntryById(this.unique(options).departments, entry.fromDepartment),
      toDepartment: this.getCollectionEntryById(this.unique(options).departments, entry.toDepartment),
      service: this.getCollectionEntryById(this.unique(options).services, entry.service),
      packaging: this.getCollectionEntryById(this.unique(options).packagings, entry.packaging)
    }))
  }
  private getLoadsSummary(tableName: string): ResponseLoadsSummary {
    let raw: string = this.readDBTable(tableName)
    let parsed: Array<DBLoadEntryData> = JSON.parse(raw)
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

          summary.totalWeight += parseFloat(entry.weight)
          summary.totalVolume += parseFloat(entry.length) * parseFloat(entry.width) * parseFloat(entry.height)

          if (summary.totalByDepartment[entry.toDepartment]) {
            summary.totalByDepartment[entry.toDepartment]++
          } else {
            summary.totalByDepartment[entry.toDepartment] = 1
          }
          if (summary.totalByService[entry.service]) {
            summary.totalByService[entry.service]++
          } else {
            summary.totalByService[entry.service] = 1
          }
          if (summary.totalByPackaging[entry.packaging]) {
            summary.totalByPackaging[entry.packaging]++
          } else {
            summary.totalByPackaging[entry.packaging] = 1
          }
        }
      })
    }
    return { data: summary }
  }
  private updateAnyTypeAnyEntity(requestData: RequestData): Array<string> {
    switch (requestData.entity) {
      case 'collection':
        return this.updateRowsList(requestData.type, (requestData as RequestCollectionData).data)
        break;

      case 'entry':
        return [this.updateRow(requestData)]
        break;

      default:
        break;
    }
  }
  private getCollectionEntryById(collection: Array<any>, id: string): any {
    return collection.find(item => item.id === id)
  }
  private getSettingsCollection(): ResponseSettingsCollectionData {
    return this.readAnyTypeAnyEntity({
      action: 'read',
      type: 'settings',
      entity: 'collection',
      data: {}
    }) as ResponseSettingsCollectionData
  }

  constructor() { }

  mockRequest(subscriber: Subscriber<any>, requestData: RequestData): void {
    let action: Function

    this.checkAndPatchDb()

    switch (requestData.action) {
      case 'execcomm':
        action = () => this.execCommand(requestData)
        break;

      case 'create':
        action = () => this.createAnyTypeRow(requestData)
        break;

      case 'read':
        action = () => this.readAnyTypeAnyEntity(requestData)
        break;

      case 'update':
        action = () => this.updateAnyTypeAnyEntity(requestData)
        break;

      case 'delete':
        action = () => this.deleteRow(requestData)
        break;

      default:
        action = () => null
        break;
    }
    this.mockResponseDelay(() => {
      subscriber.next(JSON.stringify(action()))
      subscriber.complete()
    })
  }
}
/* SORT HANDLERS */
interface SortHandlers {
  formed: Function
}
/* DB DATA */
interface DBEntryData {
  id: string
}
interface DBLoadEntryData extends DBEntryData {
  status: string
  formed: string
  declaredCost: string
  fromDepartment: string
  height: string
  length: string
  packaging: string
  service: string
  toDepartment: string
  weight: string
  width: string
}
interface DBSettingsEntryData extends DBEntryData {
  property: string
  modifier: string
  stackId: string
  value: string
}
/* REQUEST */
interface RequestData {
  action: string
  type: string
  entity: string
  data: any
}
interface RequestCommandData extends RequestData {
  data: Command
}
interface Command {
  command: string
  options: CommandOptions
}
interface CommandOptions {
  formedSpanStart: Date
  formedSpanEnd: Date
  quantity: number
  dbIdPrefix: string
}
interface RequestEntryData extends RequestData {
  data: {
    id: string
  }
}
interface RequestLoadEntryData extends RequestEntryData {
  data: {
    id: string
    formed: string
    status: string
  }
}
interface RequestCollectionData extends RequestData {
  data: Array<DBEntryData>
}
/* RESPONSE */
interface ResponseData {
  data: any
}
/* entry */
interface ResponseEntryData extends ResponseData {
  id: string
}
interface ResponseLoadEntryData extends ResponseEntryData {
  data: {
    id: string
    status: string
    formed: string
    declaredCost: string
    fromDepartment: ResponseLoadSelectedData
    height: string
    length: string
    packaging: ResponseLoadSelectedData
    service: ResponseLoadSelectedData
    toDepartment: ResponseLoadSelectedData
    weight: string
    width: string
  }
}
interface ResponseLoadSelectedData {
  id: string
  title: string
}
/* collection */
interface ResponseCollectionData extends ResponseData {
  type: string
}
interface ResponseLoadCollectionData extends ResponseCollectionData {
  data: Array<ResponseLoadCollectionEntry>
}
interface ResponseLoadCollectionEntry {
  id: string
  fromDepartment: ResponseLoadSelectedData
  packaging: ResponseLoadSelectedData
  service: ResponseLoadSelectedData
  toDepartment: ResponseLoadSelectedData
  status: ResponseLoadSelectedData
  formed: string
}
interface ResponseSettingsCollectionData extends ResponseCollectionData {
  data: Array<DBSettingsEntryData>
}
/* SUMMARY */
interface ResponseLoadsSummary extends ResponseData {
  data: {
    totalRecords: number
    totalInStorage: number
    totalWeight: number
    totalVolume: number
    totalByDepartment: any
    totalByService: any
    totalByPackaging: any
  }
}
