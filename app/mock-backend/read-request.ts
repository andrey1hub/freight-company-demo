import { AbstractRequest } from './abstract-request';
import { DatabaseService } from './database.service';
import { BackendDBEntryData, BackendDBLoadEntryData, BackendDBSettingsEntryData, BackendRequest, BackendOptionData, BackendResponseLoadEntryData, BackendData, BackendResponseLoadSummaryData, BackendOptionsData } from './models';
import { initialSettings } from './initial-settings';
import { options } from 'src/app/data/options';

export class ReadRequest extends AbstractRequest {
  private optionsData: BackendOptionsData = AbstractRequest.unique(options)
  private getLoadOptionsData(load: BackendDBLoadEntryData | BackendResponseLoadEntryData): BackendResponseLoadEntryData {
    return {
      ...load,
      status: this.optionsData.statuses.find((item: BackendOptionData) => item.id === load.status),
      fromDepartment: this.optionsData.departments.find((item: BackendOptionData) => item.id === load.fromDepartment),
      toDepartment: this.optionsData.departments.find((item: BackendOptionData) => item.id === load.toDepartment),
      service: this.optionsData.services.find((item: BackendOptionData) => item.id === load.service),
      packaging: this.optionsData.packagings.find((item: BackendOptionData) => item.id === load.packaging)
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
    return this.dbService.readParsedDBTable(table).find(item => item.id === id)
  }
  readSettingsCollection(requestData: BackendRequest<null>): BackendData<Array<BackendDBSettingsEntryData>> {
    let parsed = this.dbService.readParsedDBTable(requestData.type) as Array<BackendDBSettingsEntryData>

    if (!parsed.length) {
      parsed = AbstractRequest.unique(initialSettings)
      parsed.push({
        id: '',
        property: 'firstRunOfApp',
        modifier: 'text',
        stackId: '',
        value: 'yes'
      })
    }
    return {
      data: parsed
    }
  }
  readLoadCollection(requestData: BackendRequest<null>): BackendData<Array<BackendResponseLoadEntryData>> {
    let parsed = this.dbService.readParsedDBTable(requestData.type) as Array<BackendResponseLoadEntryData>

    parsed = parsed.map((entry: BackendDBLoadEntryData) => this.getLoadOptionsData({
      id: entry.id,
      formed: entry.formed,
      status: entry.status,
      fromDepartment: entry.fromDepartment,
      toDepartment: entry.toDepartment,
      service: entry.service,
      packaging: entry.packaging
    }))
    return {
      data: parsed.length && parsed || null
    }
  }
  readLoadEntry(requestData: BackendRequest<BackendDBEntryData>): BackendData<BackendResponseLoadEntryData> {
    let entry: BackendDBLoadEntryData = this.readRow(requestData.type, requestData.data.id) as BackendDBLoadEntryData
    if (!entry) return {
      data: null
    }
    return {
      data: this.getLoadOptionsData({ ...entry })
    }
  }
  readLoadSummary(requestData: BackendRequest<null>): BackendData<BackendResponseLoadSummaryData> {
    let parsed = this.dbService.readParsedDBTable(requestData.type) as Array<BackendDBLoadEntryData>
    let summary: any = {}

    summary.totalRecords = parsed.length
    summary.totalInStorage = 0
    summary.totalWeight = 0
    summary.totalVolume = 0
    summary.totalByDepartment = {}
    summary.totalByService = {}
    summary.totalByPackaging = {}
    if (parsed.length) {
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
