import { EntryData } from './entry-data.public';

export interface SettingEntryData extends EntryData {
  property: string
  value: string
}
