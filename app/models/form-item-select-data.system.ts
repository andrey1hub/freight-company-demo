import { FormItemData } from './form-item-data.system';

export interface FormItemSelectData extends FormItemData {
  clearable?: boolean
  rowClasses: string
  labelClasses: string
  inputClasses: string
  stackId: string
}
