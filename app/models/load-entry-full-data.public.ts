import { OptionItemData } from './option-item-data.system';

export interface LoadEntryFullData {
  id: string
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
