import { SettingsListIds } from './settings-list-ids.system';
import { SettingEntryData } from './setting-entry-data.public';

export interface SettingsRawData {
  stack: Array<SettingEntryData>
  values: SettingsListIds
}
