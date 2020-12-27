import { AbstractRequest } from './abstract-request';
import { CreateRequest } from './create-request';
import { DatabaseService } from './database.service';
import { BackendDBEntryData, BackendDBLoadEntryData, BackendDBSettingsEntryData, BackendRequest, BackendOptionData, BackendResponseLoadEntryData, BackendData, BackendResponseCollection, BackendResponseEntry, BackendResponseLoadSummaryData } from './models';
import { initialSettings } from './initial-settings';
import { options } from 'src/app/data/options';

export class ReadRequest extends AbstractRequest {
  private getLoadOptionsData(load: BackendDBLoadEntryData | BackendResponseLoadEntryData): BackendResponseLoadEntryData {
    return {
      ...load,
      status: AbstractRequest.unique(options).statuses.find((item: BackendOptionData) => item.id === load.status),
      fromDepartment: AbstractRequest.unique(options).departments.find((item: BackendOptionData) => item.id === load.fromDepartment),
      toDepartment: AbstractRequest.unique(options).departments.find((item: BackendOptionData) => item.id === load.toDepartment),
      service: AbstractRequest.unique(options).services.find((item: BackendOptionData) => item.id === load.service),
      packaging: AbstractRequest.unique(options).packagings.find((item: BackendOptionData) => item.id === load.packaging)
    }
  }

  constructor(private dbService: DatabaseService) {
    super()
  }

  getProcessorName(requestData: BackendRequest<BackendDBEntryData | null>): string {
    let entity: string = requestData.entity
    let type: string = requestData.type
    return type && entity && 'read' + type[0].toLocaleUpperCase() + type.substr(1) + entity[0].toLocaleUpperCase() + entity.substr(1) || null
  }

  readRow(table: string, id: string): BackendDBEntryData {
    let raw: string = this.dbService.readDBTable(table)
    let parsed: Array<BackendDBEntryData>
    let entry: BackendDBEntryData

    if (raw) {
      parsed = JSON.parse(raw)
      entry = parsed.find(item => item.id === id)
    }
    return entry
  }
  readSettingsCollection(requestData: BackendRequest<null>): BackendResponseCollection<Array<BackendDBSettingsEntryData>> {
    let raw: string = this.dbService.readDBTable(requestData.type)
    let parsed: Array<BackendDBSettingsEntryData>

    if (raw) {
      parsed = JSON.parse(raw)
    } else {
      parsed = (new CreateRequest(this.dbService)).createRowsList(requestData.type, initialSettings) as Array<BackendDBSettingsEntryData>
      parsed.push({
        id: '',
        property: 'firstRunOfApp',
        modifier: 'text',
        stackId: '',
        value: 'yes'
      })
    }
    return {
      type: requestData.type,
      data: parsed
    }
  }
  readLoadCollection(requestData: BackendRequest<null>): BackendResponseCollection<Array<BackendResponseLoadEntryData>> {
    let raw: string = this.dbService.readDBTable(requestData.type)
    let parsed: Array<BackendResponseLoadEntryData>

    if (raw) {
      parsed = JSON.parse(raw).map((entry: BackendDBLoadEntryData) => this.getLoadOptionsData({
        id: entry.id,
        formed: entry.formed,
        status: entry.status,
        fromDepartment: entry.fromDepartment,
        toDepartment: entry.toDepartment,
        service: entry.service,
        packaging: entry.packaging
      }))
    }
    return {
      type: requestData.type,
      data: parsed || null
    }
  }
  readLoadEntry(requestData: BackendRequest<BackendDBEntryData>): BackendResponseEntry<BackendResponseLoadEntryData> {
    let entry: BackendDBLoadEntryData = this.readRow(requestData.type, requestData.data.id) as BackendDBLoadEntryData
    if (!entry) return {
      id: null,
      data: null
    }
    return {
      id: entry.id,
      data: this.getLoadOptionsData({ ...entry })
    }
  }
  readLoadSummary(requestData: BackendRequest<null>): BackendData<BackendResponseLoadSummaryData> {
    let raw: string = this.dbService.readDBTable(requestData.type)
    let parsed: Array<BackendDBLoadEntryData> = JSON.parse(raw)
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

}
