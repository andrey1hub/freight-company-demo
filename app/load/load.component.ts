import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { LoadService } from 'src/app/services/load.service';
import { LoadEntryFullData } from 'src/app/models/load-entry-full-data.public';
import { appData } from 'src/app/data/app';
import { ConfirmDialogComponent } from 'src/app/mat/confirm-dialog/confirm-dialog.component';
import { SettingsService } from 'src/app/services/settings.service';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { UnitsSystems } from 'src/app/models/units.system';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {
  loadId: string
  load: LoadEntryFullData
  loadInStorageStatusId: string = '1'
  showLoad: boolean = false
  showErrorMessage: boolean = false
  staticData = appData.load
  units: UnitsSystems = UtilityService.uniqueCopy(appData.units)
  settings: SettingsListData

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private loadService: LoadService
  ) { }

  ngOnInit(): void {
    this.settingsService.readSettings(
      (settingsData: SettingsListData) => {
        this.settings = settingsData
      }
    )

    this.route.paramMap.subscribe(params => {
      this.loadId = params.get('loadId')
      this.readLoad()
    })
  }
  readLoad() {
    this.loadService.readLoad(
      (loadData: LoadEntryFullData) => {
        if (loadData) {
          this.load = loadData
          this.showLoad = true
        } else {
          this.load = null
          this.showErrorMessage = true
        }
      },
      { id: this.loadId }
    )
  }
  deleteLoad() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '80%',
      data: {
        header: this.staticData.confirmHeader,
        text: this.staticData.confirmText,
        bttnCancel: this.staticData.confirmCancel,
        bttnOk: this.staticData.confirmDelete,
        handler: () => {
          this.loadService.deleteLoad(
            (isDeleted: boolean) => {
              if (isDeleted) {
                dialogRef.close()
                this.router.navigate(['loads'])
              }
            },
            { id: this.loadId }
          )
        }
      }
    })
  }

}
