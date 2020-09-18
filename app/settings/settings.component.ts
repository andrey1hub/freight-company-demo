import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SettingsService, SettingsListData, SettingsRequestData } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: SettingsListData = {
    main: {
      currentDepartment: {
        dbRecordId: '',
        title: '',
        id: ''
      }
    },
    departments: [],
    services: [],
    packagings: [],
    statuses: []
  }
  form: FormGroup
  showSuccessMessage: Boolean = false

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    let scope: SettingsComponent = this
    let subscription: Subscription = this.settingsService.readSettings().subscribe({
      next(settingsData) {
        scope.settings = settingsData.data

        scope.form.setValue({
          currentDepartment: scope.settings.main.currentDepartment.id
        })
      },
      complete() {
        subscription.unsubscribe()
      }
    })

    this.form = new FormGroup({
      currentDepartment: new FormControl('', Validators.required)
    })
  }
  onFormSubmit() {
    let scope: SettingsComponent = this
    let raw: any = this.form.getRawValue()
    let requestData: SettingsRequestData

    this.showSuccessMessage = false
    Object.keys(raw).forEach(key => {
      requestData = {
        id: scope.settings.main[key].dbRecordId,
        property: key,
        value: raw[key]
      }
    })

    let subscription: Subscription = this.settingsService.updateSettings(requestData).subscribe({
      next(settingId) {
        if (settingId === requestData.id) scope.showSuccessMessage = true
      },
      complete() {
        subscription.unsubscribe()
      }
    })
  }

}
