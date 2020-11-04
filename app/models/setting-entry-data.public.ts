import { EntryData } from './entry-data.public';

export interface SettingEntryData extends EntryData {
  property: string
  modifier: string
  stackId: string
  value: string
}
