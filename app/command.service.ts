import { Injectable } from '@angular/core';

import { AbstractStorageService } from './abstract-storage.service';
import { DataService } from './data.service';
import { Command } from './models/command.public';

@Injectable({
  providedIn: 'root'
})
export class CommandService extends AbstractStorageService {
  static DATA_TYPE_DB: string = 'db'
  static DATA_TYPE_STRING: string = 'string'

  static COMMAND_GENERATE: string = 'generate'
  static COMMAND_DUMP: string = 'dump'
  static COMMAND_RESTORE: string = 'restore'

  constructor(private dataService: DataService) {
    super()
  }

  execCommand(handler: Function, type: string, data: Command): void {
    this.processRequest(
      this.dataService.execCommand(type, data),
      handler
    )
  }

}
