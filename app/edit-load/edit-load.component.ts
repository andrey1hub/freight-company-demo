import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SettingsService } from 'src/app/services/settings.service';
import { LoadService } from 'src/app/services/load.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ItemFormControl } from 'src/app/models/item-form-control.system';
import { FormItemInputTextData } from 'src/app/models/form-item-input-text-data.system';
import { FormItemSelectData } from 'src/app/models/form-item-select-data.system';
import { editLoadFormData } from 'src/app/data/edit-load-form';
import { options } from 'src/app/data/options';
import { OptionsData } from 'src/app/models/options-data.system';
import { LoadEntryData } from 'src/app/models/load-entry-data.public';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { LoadEntryFullData } from 'src/app/models/load-entry-full-data.public';
import { appData } from 'src/app/data/app';
import { UnitsSystems } from 'src/app/models/units.system';

@Component({
  selector: 'app-edit-load',
  templateUrl: './edit-load.component.html',
  styleUrls: ['./edit-load.component.scss']
})
export class EditLoadComponent implements OnInit {
  loadId: string
  settings: SettingsListData
  options: OptionsData = UtilityService.uniqueCopy(options)
  form: FormGroup
  departmentsSync: Array<FormControl> = []
  staticData = editLoadFormData.static
  statusControlData: FormItemSelectData = UtilityService.uniqueCopy(editLoadFormData.status)
  selectControlsData: Array<Array<FormItemSelectData>> = UtilityService.uniqueCopy(editLoadFormData.selects)
  inputControlsData: Array<FormItemInputTextData> = UtilityService.uniqueCopy(editLoadFormData.inputs)
  units: UnitsSystems = UtilityService.uniqueCopy(appData.units)
  showErrorMessage: boolean = false

  private switchControls(enable?: boolean, stack?: Array<string>): void {
    let action: string

    if (!stack) {
      stack = Object.keys(this.form.controls)
    }

    if (enable) {
      action = 'enable'
    } else {
      action = 'disable'
    }

    stack.forEach(controlName =>
      this.form.controls[controlName][action]()
    )
  }

  constructor(
    private settingsService: SettingsService,
    private loadService: LoadService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.settingsService.readSettings(
      (settingsData: SettingsListData) => {
        this.settings = settingsData

        if (!this.loadId) {
          this.form.setValue({
            validityControl: 'done',
            fromDepartment: this.settings.currentDepartment.id,
            toDepartment: this.options.departments[0].id,
            service: this.options.services[0].id,
            packaging: this.options.packagings[0].id,
            length: '',
            width: '',
            height: '',
            weight: '',
            declaredCost: ''
          })
        }

        this.inputControlsData = this.inputControlsData.map(item => {
          item.placeHolder = UtilityService.parseStringWithParams(
            item.placeHolder,
            (params: Array<string>) => ({
              units: this.units[this.settings.unitsSystem.id][params[0]]
            })
          )
          return item
        })
      }
    )

    /**
     * At Create New Load page FormGroup is instantiated empty and have valid = true state.
     * As FormControls get added from child Item...Components FormGroup's state changes to valid = false.
     * This behavior affects submit button's disabled state, which is considered by Angular as an error.
     * validityControl does nothing except making FormGroup invalid initially.
     * */
    this.form = new FormGroup({
      validityControl: new FormControl('', Validators.required)
    })

    this.route.paramMap.subscribe(params => {
      this.loadId = params.get('loadId')

      if (this.loadId) {
        if (!this.form.controls.formed) this.form.addControl('formed', new FormControl('', Validators.required))
        this.readLoad()
      }
    })
  }
  addFormControl(control: ItemFormControl) {
    this.form.addControl(control.name, control.instance)

    switch (control.name) {
      case 'fromDepartment':
      case 'toDepartment':
        this.addSelectToSync(control.instance)
        break;

      case 'status':
        this.addStatusHandler(control.instance)
        break;
    }
  }
  addSelectToSync(select: FormControl): void {
    let scope: EditLoadComponent = this
    let index: number = this.departmentsSync.push(select) - 1
    let otherSelect: FormControl

    select.valueChanges.subscribe({
      next(newValue: string) {
        if (!scope.loadId || scope.form.controls.status?.value === '1') {
          if (!otherSelect) {
            otherSelect = scope.departmentsSync.find((item, itemIndex) => item && itemIndex !== index)
          }
          if (newValue === scope.settings.currentDepartment.id) {
            if (otherSelect.disabled) otherSelect.enable({ emitEvent: false })
          } else {
            otherSelect.setValue(scope.settings.currentDepartment.id, { emitEvent: false })
            if (!otherSelect.disabled) otherSelect.disable({ emitEvent: false })
          }
        }
      }
    })
  }
  addStatusHandler(select: FormControl): void {
    let scope: EditLoadComponent = this
    let stack: Array<string>
    let stackId: string

    select.valueChanges.subscribe({
      next(newValue: string) {
        if (newValue === '0') {
          stack = Object.keys(scope.form.controls).filter(key => key !== 'status' && scope.form.controls[key].enabled)
          stackId = scope.loadId
        }
        if (stack && stackId) {
          if (stackId === scope.loadId) {
            scope.switchControls(newValue === '1', stack)
          } else {
            stack = undefined
            stackId = undefined
          }
        }
      }
    })
  }
  onFormSubmit() {
    if (this.loadId) {
      this.updateLoad()
    } else {
      this.createLoad()
    }
  }
  createLoad() {
    let raw: LoadEntryData = this.form.getRawValue()

    this.loadService.createLoad(
      (loadId: string) => this.router.navigate(['loads', loadId]),
      raw
    )
  }
  readLoad() {
    this.loadService.readLoad(
      (loadData: LoadEntryFullData) => {
        if (loadData) {
          this.form.setValue({
            validityControl: 'done',
            status: loadData.status.id,
            formed: loadData.formed,
            fromDepartment: loadData.fromDepartment.id,
            toDepartment: loadData.toDepartment.id,
            service: loadData.service.id,
            packaging: loadData.packaging.id,
            length: loadData.length,
            width: loadData.width,
            height: loadData.height,
            weight: loadData.weight,
            declaredCost: loadData.declaredCost
          })

          switch (loadData.status.id) {
            case '0':
              this.switchControls()
              break;

            case '1':
              this.switchControls(false, ['length', 'width', 'height', 'weight'])
              this.switchControls(true, ['status', 'service', 'packaging', 'declaredCost'])
              break;
          }
        } else {
          Object.keys(this.form.controls).forEach(controlName =>
            this.form.controls[controlName].reset({ value: '', disabled: true })
          )
          this.showErrorMessage = true
        }
      },
      { id: this.loadId }
    )
  }
  updateLoad() {
    let raw: LoadEntryData = this.form.getRawValue()
    raw.id = this.loadId

    this.loadService.updateLoad(
      (loadId: string) => this.router.navigate(['loads', loadId]),
      raw
    )
  }

}
