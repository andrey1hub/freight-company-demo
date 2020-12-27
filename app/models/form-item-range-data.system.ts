import { FormItemData } from './form-item-data.system';

export interface FormItemRangeData extends FormItemData {
  rowClasses: string
  labelClasses: string
  inputClasses: string
  min: number
  max: number
}
