import { AbstractRequest } from './abstract-request';
import { DatabaseService } from './database.service';
import { BackendDBEntryData, BackendDBLoadEntryData, BackendDBSettingsEntryData, BackendRequest, BackendSortHandlers } from './models';

export class CreateRequest extends AbstractRequest {

  constructor(private dbService: DatabaseService) {
    super()
  }

  getProcessorName(requestData: BackendRequest<BackendDBLoadEntryData | Array<BackendDBSettingsEntryData>>): string {
    let type: string = requestData.type
    let entity: string = requestData.entity
    return type && entity && 'create' + type[0].toLocaleUpperCase() + type.substr(1) + entity[0].toLocaleUpperCase() + entity.substr(1) || null
  }

  createRow(requestData: BackendRequest<BackendDBEntryData>, dbIdPrefix?: string, sortType?: string): string {
    let raw: string = this.dbService.readDBTable(requestData.type)
    let parsed: Array<BackendDBEntryData>
    let id: string = AbstractRequest.mockUIDGenerator()
    let sortHandlers: BackendSortHandlers = {
      formed: (first: BackendDBLoadEntryData, second: BackendDBLoadEntryData) => parseInt(first.formed) - parseInt(second.formed)
    }
    let entry = {} as BackendDBEntryData

    if (!raw) {
      parsed = []
    } else {
      parsed = JSON.parse(raw)
    }
    if (dbIdPrefix) id = dbIdPrefix.concat('_').concat(id)

    DatabaseService.DB_SCHEMA[requestData.type].forEach((key: string) => {
      if (typeof requestData.data[key] === 'string') {
        entry[key] = requestData.data[key]
      }
    })

    parsed.push({ ...entry, id })

    if (typeof sortType === 'string' &&
      typeof sortHandlers[sortType] === 'function') parsed.sort(sortHandlers[sortType])

    this.dbService.updateDBTable(requestData.type, JSON.stringify(parsed))

    return id
  }
  createRowsList(type: string, parsed: Array<BackendDBEntryData>, dbIdPrefix?: string, sortType?: string): Array<string> {
    return AbstractRequest.unique(parsed).map((data: BackendDBEntryData) => {
      return this.createRow({
        action: 'create',
        type,
        entity: 'entry',
        data
      }, dbIdPrefix, sortType)
    })
  }
  createSettingsCollection(requestData: BackendRequest<Array<BackendDBSettingsEntryData>>): Array<string> {
    return this.createRowsList(requestData.type, requestData.data)
  }
  createLoadEntry(requestData: BackendRequest<BackendDBLoadEntryData>): string {
    requestData.data.formed = '' + (new Date()).getTime()
    requestData.data.status = '1'
    return this.createRow(requestData)
  }

}
