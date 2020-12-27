import { AbstractRequest } from './abstract-request';
import { DatabaseService } from './database.service';
import { BackendDBEntryData, BackendRequest } from './models';

export class DeleteRequest extends AbstractRequest {

  constructor(private dbService: DatabaseService) {
    super()
  }

  getProcessorName(requestData: BackendRequest<BackendDBEntryData>): string {
    return 'deleteRow'
  }

  deleteRow(requestData: BackendRequest<BackendDBEntryData>): boolean {
    let raw: string = this.dbService.readDBTable(requestData.type)
    let parsed: Array<BackendDBEntryData>

    parsed = JSON.parse(raw).filter((item: BackendDBEntryData) =>
      (item.id === requestData.data.id ? false : item)
    )
    this.dbService.updateDBTable(requestData.type, JSON.stringify(parsed))
    return true
  }

}
