import { AbstractRequest } from './abstract-request';
import { DatabaseService } from './database.service';
import { BackendDBEntryData, BackendDBLoadEntryData, BackendDBSettingsEntryData, BackendRequest } from './models';

export class UpdateRequest extends AbstractRequest {

  constructor(private dbService: DatabaseService) {
    super()
  }

  getProcessorName(requestData: BackendRequest<BackendDBLoadEntryData | Array<BackendDBSettingsEntryData>>): string {
    let type: string = requestData.type
    let entity: string = requestData.entity
    return type && entity && 'update' + type[0].toLocaleUpperCase() + type.substr(1) + entity[0].toLocaleUpperCase() + entity.substr(1) || null
  }

  updateRow(requestData: BackendRequest<BackendDBEntryData>): string {
    let parsed = this.dbService.readParsedDBTable(requestData.type)
    let entry = {} as BackendDBEntryData

    DatabaseService.DB_SCHEMA[requestData.type].forEach((key: string) => {
      if (typeof requestData.data[key] === 'string') {
        entry[key] = requestData.data[key]
      }
    })

    parsed = parsed.map((item: BackendDBEntryData) => item.id === entry.id ? entry : item)
    this.dbService.updateDBTable(requestData.type, JSON.stringify(parsed))
    return requestData.data.id
  }
  updateRowsList(type: string, parsed: Array<BackendDBEntryData>): Array<string> {
    return parsed.map(data => this.updateRow({
      action: 'update',
      type,
      entity: 'entry',
      data
    }))
  }
  updateSettingsCollection(requestData: BackendRequest<Array<BackendDBSettingsEntryData>>): Array<string> {
    return this.updateRowsList(requestData.type, requestData.data.filter(item => item.property !== 'currentDepartment' && item.property !== 'unitsSystem'))
  }
  updateLoadEntry(requestData: BackendRequest<BackendDBLoadEntryData>): string {
    return this.updateRow(requestData)
  }

}
