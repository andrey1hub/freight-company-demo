/* COMMON */
export interface BackendData<T> {
  data: T
}
export interface BackendOptionData {
  id: string
  title: string
}

/* SORT HANDLERS */
export interface BackendSortHandlers {
  formed: Function
}
/* DB DATA */
export interface BackendDbSchema {
  settings: Array<string>
  load: Array<string>
  DB_REVISION: string
}
export interface BackendDbDump {
  settings: Array<BackendDBSettingsEntryData>
  load: Array<BackendDBLoadEntryData>
  DB_REVISION: number
}
export interface BackendDBEntryData {
  id: string
}
export interface BackendDBLoadEntryData extends BackendDBEntryData {
  status: string
  formed: string
  declaredCost: string
  fromDepartment: string
  height: string
  length: string
  packaging: string
  service: string
  toDepartment: string
  weight: string
  width: string
}
export interface BackendDBSettingsEntryData extends BackendDBEntryData {
  property: string
  modifier: string
  stackId: string
  value: string
}
/* REQUEST */
export interface BackendRequest<T> extends BackendData<T> {
  action: string
  type: string
  entity: string
}
export interface BackendRequestCommandData {
  command: string
  options: BackendRequestCommandOptions
}
export interface BackendRequestCommandOptions {
  formedSpanStart: Date
  formedSpanEnd: Date
  quantity: number
  dbIdPrefix: string
  dump: string
}
/* RESPONSE */
/* entry */
export interface BackendResponseEntry<T> extends BackendData<T> {
  id: string
}
export interface BackendResponseLoadEntryData extends BackendDBEntryData {
  formed: string
  status: string | BackendOptionData
  fromDepartment: string | BackendOptionData
  packaging: string | BackendOptionData
  service: string | BackendOptionData
  toDepartment: string | BackendOptionData
  declaredCost?: string
  height?: string
  length?: string
  weight?: string
  width?: string
}
/* collection */
export interface BackendResponseCollection<T> extends BackendData<T> {
  type: string
}
/* SUMMARY */
export interface BackendResponseLoadSummaryData {
  totalRecords: number
  totalInStorage: number
  totalWeight: number
  totalVolume: number
  totalByDepartment: any
  totalByService: any
  totalByPackaging: any
}
