import { FormItemData } from './form-item-data.system';

export interface FormItemDatepickerData extends FormItemData {
  foldable: boolean
  propertyStart: string
  propertyEnd: string
  labelClasses: string
  inputClasses: string
  inputStartClasses: string
  inputEndClasses: string
  placeHolderStart: string
  placeHolderEnd: string
}
