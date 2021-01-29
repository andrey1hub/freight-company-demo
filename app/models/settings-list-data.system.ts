import { OptionItemData } from './option-item-data.system';
import { SettingEntryData } from './setting-entry-data.public';

export interface SettingsListData {
  currentDepartment: OptionItemData
  unitsSystem: OptionItemData
  loadsNavHotkeys: boolean
  keepFilterQuery: boolean
  keepFilterHistory: boolean
  loadsNavButtons: boolean
  showLoadsFilter: boolean
  firstRunOfApp?: Array<SettingEntryData> | string
}
