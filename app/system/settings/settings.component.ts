import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SettingsService } from 'src/app/services/settings.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ItemFormControl } from 'src/app/models/item-form-control.system';
import { options } from 'src/app/data/options';
import { OptionsData } from 'src/app/models/options-data.system';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { SettingsListIds } from 'src/app/models/settings-list-ids.system';
import { settingsForm } from 'src/app/data/settings-form';
import { FormItemSelectData } from 'src/app/models/form-item-select-data.system';
import { SettingEntryData } from 'src/app/models/setting-entry-data.public';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  staticData = settingsForm.static
  groupLoads = UtilityService.uniqueCopy(settingsForm.groupLoads)
  groupLoadsFilter = UtilityService.uniqueCopy(settingsForm.groupLoadsFilter)
  selectsData: Array<FormItemSelectData> = UtilityService.uniqueCopy(settingsForm.selects)
  settings: SettingsListData
  options: OptionsData = UtilityService.uniqueCopy(options)
  form: FormGroup
  showSuccessSavedMsg: boolean
  showSuccessSetupMsg: boolean

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
          keepFilterHistory: this.settings.keepFilterHistory,
          loadsNavButtons: this.settings.loadsNavButtons,
          loadsNavHotkeys: this.settings.loadsNavHotkeys
        })
        this.form.removeControl('validityControl')

        if (!this.settings.firstRunOfApp) {
          this.form.controls.currentDepartment.disable()
          this.form.controls.unitsSystem.disable()
        }
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

    this.showSuccessSavedMsg = false
    this.showSuccessSetupMsg = false

    if (this.settings.firstRunOfApp) {
      this.settingsService.createSettings(
        (response: SettingsListData) => {
          this.showSuccessSetupMsg = true
          this.settings = response

          if (!this.settings.firstRunOfApp) {
            this.form.controls.currentDepartment.disable()
            this.form.controls.unitsSystem.disable()
          }
        },
        {
          stack: this.settings.firstRunOfApp as Array<SettingEntryData>,
          values: raw
        }
      )
    } else {
      this.settingsService.updateSettings(
        () => {
          this.showSuccessSavedMsg = true
        },
        raw
      )
    }
  }

}
