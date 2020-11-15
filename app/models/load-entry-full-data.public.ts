import { EntryData } from './entry-data.public';
import { OptionItemData } from './option-item-data.system';

export interface LoadEntryFullData extends EntryData {
  fromDepartment: OptionItemData
  packaging: OptionItemData
  service: OptionItemData
  toDepartment: OptionItemData
  status: OptionItemData
  formed: string
  length?: string
  width?: string
  height?: string
  weight?: string
  declaredCost?: string
}
