import { OptionItemData } from './option-item-data.system';

export interface SettingsListData {
  currentDepartment: OptionItemData
  unitsSystem: OptionItemData
  loadsNavHotkeys: boolean
  keepFilterQuery: boolean
  keepFilterHistory: boolean
  loadsNavButtons: boolean
  showLoadsFilter: boolean
  firstRunOfApp?: string
}
