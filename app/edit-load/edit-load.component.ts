import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SettingsListData, SettingsService } from '../settings.service'
import { LoadService, LoadRequestData } from '../load.service';

@Component({
  selector: 'app-edit-load',
  templateUrl: './edit-load.component.html',
  styleUrls: ['./edit-load.component.scss']
})
export class EditLoadComponent implements OnInit {
  loadId: String
  settings: SettingsListData = {
    main: {
      currentDepartment: {
        id: '',
        title: '',
        dbRecordId: ''
      }
    },
    departments: [],
    services: [],
    packagings: [],
    statuses: []
  }
  form: FormGroup
  showErrorMessage: Boolean = false

  constructor(
    private settingsService: SettingsService,
    private loadService: LoadService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let scope: EditLoadComponent = this
    let subscription: Subscription = this.settingsService.readSettings().subscribe({
      next(settingsData) {
        scope.settings = settingsData.data

        if (!scope.loadId) scope.form.setValue({
          fromDepartment: scope.settings.main.currentDepartment.id,
          toDepartment: scope.settings.departments[0].id,
          service: scope.settings.services[0].id,
          packaging: scope.settings.packagings[0].id,
          length: '',
          width: '',
          height: '',
          weight: '',
          declaredCost: ''
        })
      },
      complete() {
        subscription.unsubscribe()
      }
    })

    this.route.paramMap.subscribe(params => {
      this.loadId = params.get('loadId')

      this.setupForm()
      if (this.loadId) this.readLoad(this.loadId)
    })
  }
  setupForm() {
    let updateLoadControls: any = {}

    if (this.loadId) updateLoadControls = {
      status: new FormControl('', Validators.required),
      formed: new FormControl('', Validators.required)
    }

    this.form = new FormGroup({
      ...updateLoadControls,
      fromDepartment: new FormControl({
        value: '',
        disabled: true
      }),
      toDepartment: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      packaging: new FormControl('', Validators.required),
      length: new FormControl('', [
        Validators.required,
        Validators.min(0.1),
        Validators.pattern('[0-9]*(?:\.[0-9])?')
      ]),
      width: new FormControl('', [
        Validators.required,
        Validators.min(0.1),
        Validators.pattern('[0-9]*(?:\.[0-9])?')
      ]),
      height: new FormControl('', [
        Validators.required,
        Validators.min(0.1),
        Validators.pattern('[0-9]*(?:\.[0-9])?')
      ]),
      weight: new FormControl('', [
        Validators.required,
        Validators.min(0.1),
        Validators.pattern('[0-9]*(?:\.[0-9])?')
      ]),
      declaredCost: new FormControl('', [
        Validators.min(0.01),
        Validators.pattern('[0-9]*(?:\.[0-9][0-9])?')
      ])
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
    let scope: EditLoadComponent = this
    let raw: LoadRequestData = this.form.getRawValue()

    let subscription: Subscription = this.loadService.createLoad(raw).subscribe({
      next(loadId: String) {
        scope.router.navigate(['loads', loadId])
      },
      complete() {
        subscription.unsubscribe()
      }
    })
  }
  readLoad(loadId: String) {
    let scope: EditLoadComponent = this
    let subscription: Subscription = this.loadService.readLoad(loadId).subscribe({
      next(loadData) {
        if (loadData) {
          let controlsToDisable: Array<string>

          scope.form.setValue({
            status: loadData.data.status.id,
            formed: loadData.data.formed,
            fromDepartment: loadData.data.fromDepartment.id,
            toDepartment: loadData.data.toDepartment.id,
            service: loadData.data.service.id,
            packaging: loadData.data.packaging.id,
            length: loadData.data.length,
            width: loadData.data.width,
            height: loadData.data.height,
            weight: loadData.data.weight,
            declaredCost: loadData.data.declaredCost
          })

          switch (loadData.data.status.id) {
            case '0':
              controlsToDisable = Object.keys(scope.form.controls)
              break;

            case '1':
              controlsToDisable = ['length', 'width', 'height', 'weight']
              break;

            default:
              break;
          }

          controlsToDisable.forEach(controlName =>
            scope.form.controls[controlName].disable()
          )
        } else {
          Object.keys(scope.form.controls).forEach(controlName =>
            scope.form.controls[controlName].reset({ value: '', disabled: true })
          )
          scope.showErrorMessage = true
        }
      },
      complete() {
        subscription.unsubscribe()
      }
    })
  }
  updateLoad() {
    let scope: EditLoadComponent = this
    let raw: LoadRequestData = this.form.getRawValue()
    raw.id = this.loadId

    let subscription: Subscription = this.loadService.updateLoad(raw).subscribe({
      next(loadId: String) {
        scope.router.navigate(['loads', loadId])
      },
      complete() {
        subscription.unsubscribe()
      }
    })
  }

}
