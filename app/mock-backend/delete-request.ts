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
    let parsed: Array<BackendDBEntryData> = this.dbService.readParsedDBTable(requestData.type)

    parsed = parsed.filter((item: BackendDBEntryData) => item.id !== requestData.data.id)
    this.dbService.updateDBTable(requestData.type, JSON.stringify(parsed))
    return true
  }

}
