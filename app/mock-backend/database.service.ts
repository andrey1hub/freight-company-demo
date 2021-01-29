import { Injectable } from '@angular/core';

import { BackendDbSchema, BackendDbDump, BackendDBEntryData } from './models';
import { DatabasePatches } from './database-patches';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  static DB_REVISION: number = 3
  static DB_SCHEMA: BackendDbSchema = {
    settings: ['id', 'property', 'modifier', 'stackId', 'value'],
    load: ['id', 'status', 'formed', 'declaredCost', 'fromDepartment', 'height', 'length', 'packaging', 'service', 'toDepartment', 'weight', 'width']
  }
  static checkDbSchema(dbDump: BackendDbDump): boolean {
    let passed: boolean = null

    Object.keys(DatabaseService.DB_SCHEMA).forEach(key => {
      if (passed !== false) {
        let table: Array<BackendDBEntryData> = dbDump[key]

        if (table) {
          passed = table.every(entry => {
            return Object.keys(entry).every(entryKey => {
              return DatabaseService.DB_SCHEMA[key].findIndex((schemaKey: string) => entryKey === schemaKey) >= 0 && typeof entry[entryKey] === 'string'
            })
          })
        }
      }
    })

    return passed
  }

  private validDbRevisions: Array<number> = [1, 2, 3]
  private db: Storage = window.localStorage

  constructor() { }

  readDBTable(name: string): string {
    return this.db.getItem(name)
  }
  updateDBTable(name: string, stringified: string): void {
    this.db.setItem(name, stringified)
  }
  checkAndPatchDb(): boolean {
    let dbRev: number = parseInt(this.readDBTable('DB_REVISION') || '0')
    let check: boolean = false

    if (!dbRev) {
      this.patchDb(1)
      check = true
    } else {
      if (this.validDbRevisions.includes(dbRev)) {
        if (dbRev !== DatabaseService.DB_REVISION) this.patchDb(dbRev)
        check = true
      }
    }
    return check
  }
  patchDb(revision: number): void {
    let patchFnName: string = 'patchDbRev_' + revision
    DatabasePatches[patchFnName] && typeof DatabasePatches[patchFnName] === 'function' && DatabasePatches[patchFnName](this)
    this.updateDBTable('DB_REVISION', '' + DatabaseService.DB_REVISION)
  }

}
