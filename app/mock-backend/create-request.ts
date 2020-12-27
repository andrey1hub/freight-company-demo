import { AbstractRequest } from './abstract-request';
import { DatabaseService } from './database.service';
import { BackendDBEntryData, BackendDBLoadEntryData, BackendRequest, BackendSortHandlers } from './models';

export class CreateRequest extends AbstractRequest {

  constructor(private dbService: DatabaseService) {
    super()
  }

  getProcessorName(requestData: BackendRequest<BackendDBEntryData>): string {
    let type: string = requestData.type
    return type && 'create' + type[0].toLocaleUpperCase() + type.substr(1) + 'Row' || null
  }

  createRow(requestData: BackendRequest<BackendDBEntryData>, dbIdPrefix?: string, sortType?: string): string {
    let raw: string = this.dbService.readDBTable(requestData.type)
    let parsed: Array<BackendDBEntryData>
    let id: string = AbstractRequest.mockUIDGenerator()
    let sortHandlers: BackendSortHandlers = {
      formed: (first: BackendDBLoadEntryData, second: BackendDBLoadEntryData) => parseInt(first.formed) - parseInt(second.formed)
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

    this.dbService.updateDBTable(requestData.type, JSON.stringify(parsed))

    return id
  }
  createRowsList(type: string, parsed: Array<BackendDBEntryData>, dbIdPrefix?: string, sortType?: string): Array<BackendDBEntryData> {
    return AbstractRequest.unique(parsed).map((data: BackendDBEntryData) => {
      data.id = this.createRow({
        action: 'create',
        type,
        entity: 'entry',
        data
      }, dbIdPrefix, sortType)
      return data
    })
  }
  createLoadRow(requestData: BackendRequest<BackendDBLoadEntryData>): string {
    requestData.data.formed = '' + (new Date()).getTime()
    requestData.data.status = '1'
    return this.createRow(requestData)
  }

}
