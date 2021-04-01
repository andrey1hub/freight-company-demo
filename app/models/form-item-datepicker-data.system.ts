import { FormItemData } from './form-item-data.system';

export interface FormItemDatepickerData extends FormItemData {
  clearable?: boolean
  foldable: boolean
  labelClasses: string
  inputClasses: string
  inputStartClasses: string
  inputEndClasses: string
  placeHolderStart: string
  placeHolderEnd: string
}
