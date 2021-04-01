import { BackendDBSettingsEntryData } from './models';

export const initialSettings: Array<BackendDBSettingsEntryData> = [
  {
    id: '',
    property: 'currentDepartment',
    modifier: 'select',
    stackId: 'departments',
    value: '1982543442'
  },
  {
    id: '',
    property: 'unitsSystem',
    modifier: 'select',
    stackId: 'unitsSystems',
    value: 'cmkg'
  },
  {
    id: '',
    property: 'showLoadsFilter',
    modifier: 'checkbox',
    stackId: '',
    value: '1'
  },
  {
    id: '',
    property: 'keepFilterQuery',
    modifier: 'checkbox',
    stackId: '',
    value: '1'
  },
  {
    id: '',
    property: 'keepFilterHistory',
    modifier: 'checkbox',
    stackId: '',
    value: '0'
  },
  {
    id: '',
    property: 'filterHistorySize',
    modifier: 'range',
    stackId: '',
    value: '1'
  },
  {
    id: '',
    property: 'loadsNavButtons',
    modifier: 'checkbox',
    stackId: '',
    value: '1'
  },
  {
    id: '',
    property: 'loadsNavHotkeys',
    modifier: 'checkbox',
    stackId: '',
    value: '1'
  }
]
