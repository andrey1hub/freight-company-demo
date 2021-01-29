import { BackendDBEntryData, BackendRequest, BackendRequestCommandData, BackendData, BackendResponseLoadSummaryData, BackendDBSettingsEntryData, BackendResponseLoadEntryData } from './models';

export abstract class AbstractRequest {
  static ACTION_EXECCOMM: string = 'execcomm'
  static ACTION_CREATE: string = 'create'
  static ACTION_READ: string = 'read'
  static ACTION_UPDATE: string = 'update'
  static ACTION_DELETE: string = 'delete'

  static unique(data: any): any {
    return data && JSON.parse(JSON.stringify(data))
  }
  static mockUIDGenerator(): string {
    let letters: Array<string> = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    let uid: string = ''
    for (let i = 1; i <= 10; i++) {
      uid = uid.concat(AbstractRequest.randomItemOfStackPicker(letters))
    }
    return uid
  }
  static randomItemOfStackPicker(stack: Array<any> | number): any {
    return typeof stack === 'number' ? Math.floor(Math.random() * stack) + 1 : stack.length && stack[Math.floor(Math.random() * stack.length)]
  }

  constructor() { }

  abstract getProcessorName(requestData: BackendRequest<BackendDBEntryData | Array<BackendDBEntryData> | BackendRequestCommandData | null>): string

  process(requestData: BackendRequest<BackendDBEntryData | Array<BackendDBSettingsEntryData> | BackendRequestCommandData | null>): BackendData<BackendResponseLoadEntryData | Array<BackendDBEntryData> | BackendResponseLoadSummaryData> | Array<string> | string | boolean {
    let processorName: string = this.getProcessorName(requestData)
    return this[processorName] && typeof this[processorName] === 'function' && this[processorName](requestData)
  }

}
