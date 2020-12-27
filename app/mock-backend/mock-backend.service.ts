import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';

import { BackendData, BackendDBEntryData, BackendRequest, BackendRequestCommandData, BackendResponseLoadSummaryData } from './models';
import { DatabaseService } from './database.service';
import { ExeccommRequest } from './execcomm-request';
import { CreateRequest } from './create-request';
import { ReadRequest } from './read-request';
import { UpdateRequest } from './update-request';
import { DeleteRequest } from './delete-request';
import { AbstractRequest } from './abstract-request';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {

  constructor(private dbService: DatabaseService) { }

  mockRequest(
    subscriber: Subscriber<BackendData<BackendDBEntryData | Array<BackendDBEntryData> | BackendResponseLoadSummaryData> | Array<string> | string | boolean>,
    requestData: BackendRequest<BackendDBEntryData | Array<BackendDBEntryData> | BackendRequestCommandData | null>
  ): void {
    let action: Function

    this.dbService.checkAndPatchDb()

    switch (requestData.action) {
      case AbstractRequest.ACTION_EXECCOMM:
        action = () => (new ExeccommRequest(this.dbService)).process(requestData)
        break;

      case AbstractRequest.ACTION_CREATE:
        action = () => (new CreateRequest(this.dbService)).process(requestData)
        break;

      case AbstractRequest.ACTION_READ:
        action = () => (new ReadRequest(this.dbService)).process(requestData)
        break;

      case AbstractRequest.ACTION_UPDATE:
        action = () => (new UpdateRequest(this.dbService)).process(requestData)
        break;

      case AbstractRequest.ACTION_DELETE:
        action = () => (new DeleteRequest(this.dbService)).process(requestData)
        break;

      default:
        action = () => null
        break;
    }
    setTimeout(() => {
      subscriber.next(JSON.stringify(action()))
      subscriber.complete()
    }, 0)
  }
}
