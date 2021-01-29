import { DatabaseService } from './database.service';

export class DatabasePatches {
  static patchDbRev_1(dbService: DatabaseService): void {
    dbService.updateDBTable('settings', '')
  }
  static patchDbRev_2(dbService: DatabaseService): void {
    dbService.updateDBTable('settings', '')
  }
}
