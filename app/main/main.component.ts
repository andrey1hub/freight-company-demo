import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { LoadService, LoadsSummary } from '../load.service';
import { SettingsListData, SettingsService } from '../settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  settings: SettingsListData
  summary: LoadsSummary
  form: FormGroup
  showTotalByDepartment: Number
  showTotalByService: Number
  showTotalByPackaging: Number
  appName: String = DataService.APP_NAME
  appVersion: String = DataService.APP_VERSION

  constructor(private settingsService: SettingsService, private loadService: LoadService) { }

  ngOnInit(): void {
    let scope: MainComponent = this
    let subscription: Subscription = this.settingsService.readSettings().subscribe({
      next(settingsData) {
        scope.settings = settingsData.data

        scope.form.reset({
          department: scope.settings.departments[0].id,
          service: scope.settings.services[0].id,
          packaging: scope.settings.packagings[0].id
        })
      },
      complete() {
        subscription.unsubscribe()
      }
    })

    this.form = new FormGroup({
      department: new FormControl(''),
      service: new FormControl(''),
      packaging: new FormControl('')
    })
    this.form.controls.department.valueChanges.subscribe({
      next(newValue) {
        scope.showTotalByDepartment = scope.summary && (scope.summary.totalByDepartment[newValue] || 0)
      }
    })
    this.form.controls.service.valueChanges.subscribe({
      next(newValue) {
        scope.showTotalByService = scope.summary && (scope.summary.totalByService[newValue] || 0)
      }
    })
    this.form.controls.packaging.valueChanges.subscribe({
      next(newValue) {
        scope.showTotalByPackaging = scope.summary && (scope.summary.totalByPackaging[newValue] || 0)
      }
    })

    this.getLoadsSummary()
  }
  getLoadsSummary() {
    let scope: MainComponent = this
    let subscription: Subscription = this.loadService.getLoadsSummary().subscribe({
      next(summaryData) {
        // Convert cm3 => m3
        summaryData.totalVolume = summaryData.totalVolume / 1000000
        scope.summary = summaryData

        scope.showTotalByDepartment = scope.summary.totalByDepartment[scope.settings.departments[0].id as string] || 0
        scope.showTotalByService = scope.summary.totalByService[scope.settings.services[0].id as string] || 0
        scope.showTotalByPackaging = scope.summary.totalByPackaging[scope.settings.packagings[0].id as string] || 0
      },
      complete() {
        subscription.unsubscribe()
      }
    })
  }

}
