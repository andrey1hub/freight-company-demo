import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MockBackendService } from './mock-backend.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static DATA_ACTION_READ: String = 'read'
  private static DATA_ACTION_CREATE: String = 'create'
  private static DATA_ACTION_UPDATE: String = 'update'
  private static DATA_ACTION_DELETE: String = 'delete'

  static ENTITY_SUMMARY: String = 'summary'
  static ENTITY_COLLECTION: String = 'collection'
  static ENTITY_ENTRY: String = 'entry'

  static APP_NAME: String = 'Freight Company Demo'
  static APP_VERSION: String = 'v.1.0.0'

  constructor(private mockBackendService: MockBackendService) { }

  createRequest(data: Data<Object>): Observable<any> {
    return this.mockBackendService.mockRequest({
      action: DataService.DATA_ACTION_CREATE,
      entity: DataService.ENTITY_ENTRY,
      ...data
    })
  }
  readRequest(type: String, entity: String, id?: String): Observable<any> {
    return this.mockBackendService.mockRequest({
      action: DataService.DATA_ACTION_READ,
      type,
      entity,
      data: { id }
    })
  }
  updateRequest(data: Data<Object>): Observable<any> {
    return this.mockBackendService.mockRequest({
      action: DataService.DATA_ACTION_UPDATE,
      entity: DataService.ENTITY_ENTRY,
      ...data
    })
  }
  deleteRequest(type: String, id: String): Observable<any> {
    return this.mockBackendService.mockRequest({
      action: DataService.DATA_ACTION_DELETE,
      type,
      entity: DataService.ENTITY_ENTRY,
      data: { id }
    })
  }
}
export interface Data<T> {
  type: String
  data: T
}
