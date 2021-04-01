import { AbstractRequest } from './abstract-request';
import { DatabaseService } from './database.service';
import { BackendRequestCommandOptions, BackendDbDump, BackendDBLoadEntryData, BackendRequestCommandData, BackendRequest, BackendDBSettingsEntryData, BackendOptionsData, BackendData, BackendDBEntryData } from './models';
import { options } from 'src/app/data/options';
import { CreateRequest } from './create-request';
import { ReadRequest } from './read-request';

export class ExeccommRequest extends AbstractRequest {
  private optionsData: BackendOptionsData = AbstractRequest.unique(options)

  constructor(private dbService: DatabaseService) {
    super()
  }

  getProcessorName(requestData: BackendRequest<BackendRequestCommandData>): string {
    let command: string = requestData.data.command
    let type: string = requestData.type
    return command && type && 'process' + command[0].toLocaleUpperCase() + command.substr(1) + type[0].toLocaleUpperCase() + type.substr(1) + 'Comm' || null
  }

  processGenerateLoadComm(requestData: BackendRequest<BackendRequestCommandData>): boolean {
    let commandOptions: BackendRequestCommandOptions = requestData.data.options

    if (
      commandOptions.formedSpanStart && commandOptions.formedSpanEnd &&
      commandOptions.formedSpanStart.getTime() > commandOptions.formedSpanEnd.getTime()
    ) commandOptions.formedSpanStart = null

    let type: string = requestData.type
    let formedSpanEnd: Date = commandOptions.formedSpanEnd || new Date()
    let formedSpanStart: Date = commandOptions.formedSpanStart || new Date(formedSpanEnd.getTime() - 30 * 24 * 60 * 60 * 1000)
    let quantity: number = commandOptions.quantity || 100
    let dbIdPrefix: string = commandOptions.dbIdPrefix || 'demo'
    let collection: Array<BackendDBLoadEntryData> = []
    let ids: Array<string> = []
    let settingsFromDB: BackendData<Array<BackendDBSettingsEntryData>> = (new ReadRequest(this.dbService)).readSettingsCollection({ action: 'read', type: 'settings', entity: 'collection', data: null })
    let currentDepartment: string = settingsFromDB.data.find(item => item.property === 'currentDepartment').value

    for (let i = 0; i < quantity; i++) {
      let fromDepartment: string = AbstractRequest.randomItemOfStackPicker(this.optionsData.departments).id
      let toDepartment: string
      let entry: any

      if (fromDepartment === currentDepartment) {
        toDepartment = AbstractRequest.randomItemOfStackPicker(this.optionsData.departments).id
      } else {
        toDepartment = currentDepartment
      }

      entry = {
        status: '1',
        formed: '' + (formedSpanStart.getTime() + AbstractRequest.randomItemOfStackPicker(formedSpanEnd.getTime() - formedSpanStart.getTime())),
        fromDepartment: fromDepartment,
        toDepartment: toDepartment,
        packaging: AbstractRequest.randomItemOfStackPicker(this.optionsData.packagings).id,
        service: AbstractRequest.randomItemOfStackPicker(this.optionsData.services).id,
        declaredCost: '' + AbstractRequest.randomItemOfStackPicker(100000),
        height: '' + AbstractRequest.randomItemOfStackPicker(1000),
        length: '' + AbstractRequest.randomItemOfStackPicker(1000),
        weight: '' + AbstractRequest.randomItemOfStackPicker(1000),
        width: '' + AbstractRequest.randomItemOfStackPicker(1000)
      }
      collection.push(entry)
    }
    ids = (new CreateRequest(this.dbService)).createRowsList(type, collection, dbIdPrefix, 'formed')

    return ids.length === collection.length
  }
  processGenerateStringComm(requestData: BackendRequest<BackendRequestCommandData>): string {
    let date: Date = new Date()
    return 'fcdemo-db-revision-' + DatabaseService.DB_REVISION + '-' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '-' + AbstractRequest.mockUIDGenerator() + '.json'
  }
  processDumpDbComm(requestData: BackendRequest<BackendRequestCommandData>): boolean | string {
    let dbDump: any = {}

    Object.keys(DatabaseService.DB_SCHEMA).filter(key => key !== 'settings').forEach(key => {
      let parsed: Array<BackendDBEntryData> = this.dbService.readParsedDBTable(key)

      if (parsed.length) {
        dbDump[key] = parsed
      }
    })

    return DatabaseService.checkDbSchema(dbDump) && JSON.stringify(dbDump)
  }
  processRestoreDbComm(requestData: BackendRequest<BackendRequestCommandData>): boolean {
    let dump: string = requestData.data.options.dump
    let result: boolean = false
    let parseError: boolean = false
    let parsed: BackendDbDump

    try {
      parsed = JSON.parse(dump)
    } catch (error) {
      parseError = true
    }

    if (!parseError && DatabaseService.checkDbSchema(parsed)) {
      Object.keys(DatabaseService.DB_SCHEMA).filter(key => key !== 'settings').forEach(key => {
        this.dbService.updateDBTable(key, JSON.stringify(parsed[key]))
      })
      result = true
    }
    return result
  }
  processResetDbComm(requestData: BackendRequest<BackendRequestCommandData>): boolean {
    Object.keys(DatabaseService.DB_SCHEMA).forEach(key => {
      this.dbService.updateDBTable(key, '')
    })
    return true
  }

}
