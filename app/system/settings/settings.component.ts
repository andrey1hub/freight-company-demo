import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SettingsService } from 'src/app/settings.service';
import { UtilityService } from 'src/app/utility.service';
import { ItemFormControl } from 'src/app/models/item-form-control.system';
import { options } from '../../data/options';
import { OptionsData } from 'src/app/models/options-data.system';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { SettingsListIds } from 'src/app/models/settings-list-ids.system';
import { settingsForm } from 'src/app/data/settings-form';
import { FormItemSelectData } from 'src/app/models/form-item-select-data.system';
import { FormItemCheckboxData } from 'src/app/models/form-item-checkbox-data.system';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  staticData: any = settingsForm.static
  selectsData: Array<FormItemSelectData> = settingsForm.selects
  checkboxesData: Array<FormItemCheckboxData> = settingsForm.checkboxes
  settings: SettingsListData
  options: OptionsData = UtilityService.uniqueCopy(options)
  form: FormGroup
  showSuccessMessage: boolean = false

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.readSettings(
      (settingsData: SettingsListData) => {
        this.settings = settingsData

        this.form.setValue({
          validityControl: 'done',
          currentDepartment: this.settings.currentDepartment.id,
          unitsSystem: this.settings.unitsSystem.id,
          showLoadsFilter: this.settings.showLoadsFilter,
          keepFilterQuery: this.settings.keepFilterQuery,
          loadsNavButtons: this.settings.loadsNavButtons,
          buttonsHotkeys: this.settings.buttonsHotkeys
        })
        this.form.removeControl('validityControl')
      }
    )

    this.form = new FormGroup({
      validityControl: new FormControl('', Validators.required)
    })
  }
  addFormControl(control: ItemFormControl) {
    this.form.addControl(control.name, control.instance)
  }
  onFormSubmit() {
    let raw: SettingsListIds = this.form.getRawValue()

    this.showSuccessMessage = false
    this.settingsService.updateSettings(
      (response: Array<string>) => { if (response && response.length) this.showSuccessMessage = true },
      raw
    )
  }

}
