import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MockBackendService } from './mock-backend.service';
import { EntryData } from './models/entry-data.public';
import { LoadEntryData } from './models/load-entry-data.public';
import { SettingEntryData } from './models/setting-entry-data.public';
import { Command } from 'src/app/models/command.public';
import { LoadsSummary } from './models/loads-summary.public';
import { Data } from './models/data.public';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static DATA_ACTION_EXECCOMM: string = 'execcomm'

  private static DATA_ACTION_READ: string = 'read'
  private static DATA_ACTION_CREATE: string = 'create'
  private static DATA_ACTION_UPDATE: string = 'update'
  private static DATA_ACTION_DELETE: string = 'delete'

  static ENTITY_SUMMARY: string = 'summary'
  static ENTITY_COLLECTION: string = 'collection'
  static ENTITY_ENTRY: string = 'entry'

  constructor(private mockBackendService: MockBackendService) { }

  execCommand(type: string, data: Command): Observable<boolean | string> {
    return new Observable(subscriber => this.mockBackendService.mockRequest(
      subscriber,
      {
        action: DataService.DATA_ACTION_EXECCOMM,
        entity: null,
        type,
        data
      }
    ))
  }

  createRequest(type: string, data: EntryData): Observable<string> {
    return new Observable(subscriber => this.mockBackendService.mockRequest(
      subscriber,
      {
        action: DataService.DATA_ACTION_CREATE,
        entity: DataService.ENTITY_ENTRY,
        type,
        data
      }
    ))
  }
  readRequest(type: string, entity: string, data: { id?: string }): Observable<Data<Array<EntryData> | EntryData | LoadsSummary>> {
    return new Observable(subscriber => this.mockBackendService.mockRequest(
      subscriber,
      {
        action: DataService.DATA_ACTION_READ,
        type,
        entity,
        data
      }
    ))
  }
  updateRequest(type: string, entity: string, data: LoadEntryData | Array<SettingEntryData>): Observable<Array<string>> {
    return new Observable(subscriber => this.mockBackendService.mockRequest(
      subscriber,
      {
        action: DataService.DATA_ACTION_UPDATE,
        type,
        entity,
        data
      }
    ))
  }
  deleteRequest(type: string, data: { id: string }): Observable<boolean> {
    return new Observable(subscriber => this.mockBackendService.mockRequest(
      subscriber,
      {
        action: DataService.DATA_ACTION_DELETE,
        type,
        entity: DataService.ENTITY_ENTRY,
        data
      }
    ))
  }
}
