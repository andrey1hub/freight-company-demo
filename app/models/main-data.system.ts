import { SettingsListData } from './settings-list-data.system';
import { LoadsSummary } from './loads-summary.public';
import { OptionsData } from './options-data.system';

export interface MainData extends OptionsData, SettingsListData, LoadsSummary {}
