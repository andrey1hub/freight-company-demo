import { AbstractRequest } from './abstract-request';
import { DatabaseService } from './database.service';
import { BackendDBEntryData, BackendRequest } from './models';

export class UpdateRequest extends AbstractRequest {

  constructor(private dbService: DatabaseService) {
    super()
  }

  getProcessorName(requestData: BackendRequest<BackendDBEntryData | Array<BackendDBEntryData>>): string {
    let entity: string = requestData.entity
    return entity && 'update' + entity[0].toLocaleUpperCase() + entity.substr(1) || null
  }

  updateRow(requestData: BackendRequest<BackendDBEntryData>): string {
    let raw: string = this.dbService.readDBTable(requestData.type)
    let parsed: Array<BackendDBEntryData>

    parsed = JSON.parse(raw).map((item: BackendDBEntryData) =>
      (item.id === requestData.data.id ? requestData.data : item)
    )
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
  updateCollection(requestData: BackendRequest<Array<BackendDBEntryData>>): Array<string> {
    return this.updateRowsList(requestData.type, requestData.data)
  }
  updateEntry(requestData: BackendRequest<BackendDBEntryData>): Array<string> {
    return [this.updateRow(requestData)]
  }

}
