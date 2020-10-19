import { EntryData } from './entry-data.public';

export interface LoadEntryData extends EntryData {
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
