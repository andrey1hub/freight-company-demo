import { FormItemData } from "./form-item-data.system";

export interface FormItemInputTextData extends FormItemData {
  min: number
  clearable?: boolean
  isRow: boolean
  rowClasses: string
  labelClasses: string
  inputClasses: string
  validPattern: string
  placeHolder: string
}
