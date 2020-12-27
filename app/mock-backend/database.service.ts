import { Injectable } from '@angular/core';

import { BackendDbSchema, BackendDbDump, BackendDBEntryData } from './models';
import { DatabasePatches } from './database-patches';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  static DB_REVISION: number = 2
  static DB_SCHEMA: BackendDbSchema = {
    settings: ['id', 'property', 'modifier', 'stackId', 'value'],
    load: ['id', 'status', 'formed', 'declaredCost', 'fromDepartment', 'height', 'length', 'packaging', 'service', 'toDepartment', 'weight', 'width'],
    DB_REVISION: 'number'
  }
  static checkDbSchema(dbDump: BackendDbDump): boolean {
    let passed: boolean = null

    Object.keys(DatabaseService.DB_SCHEMA).forEach(key => {
      if (passed !== false) {
        let table: Array<BackendDBEntryData> | number = dbDump[key]

        if (table) {
          if (typeof table === 'number') {
            passed = table === DatabaseService.DB_REVISION
          } else {
            passed = table.every(entry => {
              return Object.keys(entry).every(entryKey => {
                return DatabaseService.DB_SCHEMA[key].findIndex((schemaKey: string) => entryKey === schemaKey) >= 0 && typeof entry[entryKey] === 'string'
              })
            })
          }
        } else {
          passed = false
        }
      }
    })

    return passed
  }

  private validDbRevisions: Array<number> = [1, 2]
  private db: Storage = window.localStorage

  constructor() { }

  readDBTable(name: string): string {
    return this.db.getItem(name)
  }
  updateDBTable(name: string, stringified: string) {
    this.db.setItem(name, stringified)
  }
  checkAndPatchDb(): boolean {
    let dbRev: number = parseInt(this.readDBTable('DB_REVISION') || '0')
    let check: boolean = false

    if (!dbRev) {
      if (this.readDBTable('settings')) {
        this.patchDb(1)
      } else {
        this.updateDBTable('DB_REVISION', '' + DatabaseService.DB_REVISION)
      }
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
  dumpDb(): BackendDbDump {
    let dbDump: any = {}

    Object.keys(DatabaseService.DB_SCHEMA).forEach(key => {
      let raw: string = this.readDBTable(key)

      if (raw) {
        dbDump[key] = JSON.parse(raw)
      } else {
        if (key === 'DB_REVISION') {
          dbDump.DB_REVISION = DatabaseService.DB_REVISION
        } else {
          dbDump[key] = []
        }
      }
    })

    return dbDump
  }

}
