import { OptionItemData } from './option-item-data.system';

export interface SettingsListData {
  currentDepartment: OptionItemData
  unitsSystem: OptionItemData
  buttonsHotkeys: boolean
  keepFilterQuery: boolean
  loadsNavButtons: boolean
  showLoadsFilter: boolean
  firstRunOfApp?: string
}
