import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { auditTime } from 'rxjs/operators';

import { UtilityService } from 'src/app/services/utility.service';
import { loadsFilterData } from 'src/app/data/loads-filter';
import { FormItemInputTextData } from 'src/app/models/form-item-input-text-data.system';
import { FormItemSelectData } from 'src/app/models/form-item-select-data.system';
import { FormItemDatepickerData } from 'src/app/models/form-item-datepicker-data.system';
import { options } from 'src/app/data/options';
import { OptionsData } from 'src/app/models/options-data.system';
import { OptionItemData } from 'src/app/models/option-item-data.system';
import { ItemFormControl } from 'src/app/models/item-form-control.system';
import { FilterLoadsData } from 'src/app/models/filter-loads-data.system';
import { FilterControls } from 'src/app/models/filter-controls.system';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { SettingsService } from 'src/app/services/settings.service';
import { LoadsFilterService } from 'src/app/services/loads-filter.service';

@Component({
  selector: 'app-loads-filter',
  templateUrl: './loads-filter.component.html',
  styleUrls: ['./loads-filter.component.scss']
})
export class LoadsFilterComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<FilterLoadsData>()

  filterControls: FilterControls = UtilityService.uniqueCopy(loadsFilterData.filterControls)

  idFieldData: FormItemInputTextData = UtilityService.uniqueCopy(loadsFilterData.id)
  formedFieldData: FormItemDatepickerData = UtilityService.uniqueCopy(loadsFilterData.formed)
  selectFieldsData: Array<FormItemSelectData> = UtilityService.uniqueCopy(loadsFilterData.selects)
  selectOptions: OptionsData = this.getOptionsWithOptionAny(UtilityService.uniqueCopy(options))

  form: FormGroup
  filterData: FilterLoadsData
  savedFilterData: FilterLoadsData
  settings: SettingsListData
  showFilter: boolean

  private getOptionsWithOptionAny(options: OptionsData): OptionsData {
    let optionsData: any = {}

    Object.keys(options).forEach(key => {
      let stack: Array<OptionItemData> = options[key]

      stack.unshift({ id: LoadsFilterService.FILTER_ANY_OPTION_ID, title: LoadsFilterService.FILTER_ANY_OPTION_TITLE })
      optionsData[key] = stack
    })

    return optionsData
  }

  constructor(private settingsService: SettingsService, private loadsFilterService: LoadsFilterService) { }

  ngOnInit(): void {
    let scope: LoadsFilterComponent = this

    this.settingsService.readSettings((settingsData: SettingsListData) => {
      this.settings = settingsData
      this.showFilter = this.settings.showLoadsFilter

      if (this.settings.keepFilterQuery) {
        this.savedFilterData = this.loadsFilterService.getLastFilterQuery()
      }

      this.form.setValue(this.savedFilterData ? this.savedFilterData : LoadsFilterService.FILTER_DEFAULT_VALUE, { emitEvent: !!this.savedFilterData })
    })
    this.form = new FormGroup({})

    this.form.valueChanges.pipe(auditTime(LoadsFilterService.FILTER_AUDIT_TIME)).subscribe({
      next(data: FilterLoadsData) {
        let keys: Array<string> = Object.keys(data)
        let validFilter: boolean = [
          keys.every(key => scope.form.controls[key].valid),
          keys.some(key => !!data[key])
        ].every(item => item)

        if (
          validFilter &&
          scope.showFilter &&
          (!scope.filterData || JSON.stringify(data) !== JSON.stringify(scope.filterData))
        ) {
          scope.filterData = data
          scope.filterEvent.emit(data)
          if (scope.settings.keepFilterQuery) scope.loadsFilterService.saveFilterQuery(data)
        }
      }
    })
  }
  addFormControl(control: ItemFormControl) {
    this.form.addControl(control.name, control.instance)
  }
  onShowToggle(): void {
    this.showFilter = !this.showFilter
    if (this.showFilter) this.form.setValue(this.filterData ? this.filterData : this.savedFilterData ? this.savedFilterData : LoadsFilterService.FILTER_DEFAULT_VALUE)
  }
  onClearFilter(): void {
    this.form.setValue(LoadsFilterService.FILTER_DEFAULT_VALUE)
  }

}
