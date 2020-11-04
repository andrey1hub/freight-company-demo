import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { auditTime } from 'rxjs/operators';

import { UtilityService } from 'src/app/utility.service';
import { loadsFilterData } from '../../data/loads-filter';
import { FormItemInputTextData } from '../../models/form-item-input-text-data.system';
import { FormItemSelectData } from 'src/app/models/form-item-select-data.system';
import { FormItemDatepicker } from 'src/app/models/form-item-datepicker-data.system';
import { options } from '../../data/options';
import { OptionsData } from 'src/app/models/options-data.system';
import { OptionItemData } from 'src/app/models/option-item-data.system';
import { ItemFormControl } from 'src/app/models/item-form-control.system';
import { FilterLoadsData } from 'src/app/models/filter-loads-data.system';
import { FilterControls } from 'src/app/models/filter-controls.system';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { SettingsService } from 'src/app/settings.service';

@Component({
  selector: 'app-loads-filter',
  templateUrl: './loads-filter.component.html',
  styleUrls: ['./loads-filter.component.scss']
})
export class LoadsFilterComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<FilterLoadsData>()

  filterControls: FilterControls = loadsFilterData.filterControls

  idFieldData: FormItemInputTextData = loadsFilterData.id
  formedFieldData: FormItemDatepicker = loadsFilterData.formed
  selectFieldsData: Array<FormItemSelectData> = UtilityService.uniqueCopy(loadsFilterData.selects)
  selectOptions: OptionsData = this.getOptionsWithOptionAny(UtilityService.uniqueCopy(options))

  form: FormGroup
  filterData: FilterLoadsData
  settings: SettingsListData
  showFilter: boolean

  private getOptionsWithOptionAny(options: OptionsData): OptionsData {
    let optionsData: any = {}

    Object.keys(options).forEach(key => {
      let stack: Array<OptionItemData> = options[key]

      stack.unshift({ id: UtilityService.FILTER_ANY_OPTION_ID, title: UtilityService.FILTER_ANY_OPTION_TITLE })
      optionsData[key] = stack
    })

    return optionsData
  }

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    let scope: LoadsFilterComponent = this

    this.settingsService.readSettings((settingsData: SettingsListData) => {
      this.settings = settingsData
      this.showFilter = this.settings.showLoadsFilter
    })
    this.form = new FormGroup({})

    setTimeout(() => {
      this.setDefaultValue()
    }, 0)

    this.form.valueChanges.pipe(auditTime(UtilityService.FILTER_AUDIT_TIME)).subscribe({
      next(data: FilterLoadsData) {
        let validFilter: boolean = Object.keys(data).every(key => scope.form.controls[key].valid)
        if (
          validFilter &&
          (!scope.filterData || JSON.stringify(data) !== JSON.stringify(scope.filterData))
        ) {
          scope.filterData = data
          scope.filterEvent.emit(data)
        }
      }
    })
  }
  setDefaultValue(): void {
    this.form.setValue({
      id: '',
      formedAfter: '',
      formedBefore: '',
      fromDepartment: UtilityService.FILTER_ANY_OPTION_ID,
      toDepartment: UtilityService.FILTER_ANY_OPTION_ID,
      service: UtilityService.FILTER_ANY_OPTION_ID,
      packaging: UtilityService.FILTER_ANY_OPTION_ID
    })
  }
  addFormControl(control: ItemFormControl) {
    this.form.addControl(control.name, control.instance)
  }
  onShowToggle(): void {
    this.showFilter = !this.showFilter
  }
  onClearFilter(): void {
    this.setDefaultValue()
  }

}
