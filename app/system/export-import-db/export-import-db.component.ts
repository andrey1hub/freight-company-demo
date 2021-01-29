import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { appData } from 'src/app/data/app';
import { ConfirmDialogComponent } from 'src/app/mat/confirm-dialog/confirm-dialog.component';
import { CommandService } from 'src/app/services/command.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-export-import-db',
  templateUrl: './export-import-db.component.html',
  styleUrls: ['./export-import-db.component.scss']
})
export class ExportImportDbComponent implements OnInit {
  staticData = appData.systemDb
  exportFileName: string = ''
  importFileName: string = ''
  importFile: File
  dbRevision: string = ''

  showExportErrorMsg: boolean = false
  showImportErrorMsg: boolean = false
  showImportSuccessMsg: boolean = false

  formImport: FormGroup

  constructor(
    public dialog: MatDialog,
    private commandService: CommandService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    let scope: ExportImportDbComponent = this
    this.commandService.execCommand(
      (response: string) => {
        this.exportFileName = response
        this.dbRevision = response.split('-')[3]
      },
      CommandService.DATA_TYPE_STRING,
      {
        command: CommandService.COMMAND_GENERATE,
        options: null
      }
    )

    this.formImport = new FormGroup({
      file: new FormControl('', Validators.required)
    })
    this.formImport.valueChanges.subscribe({
      next(newValue: { file: string }) {
        scope.importFile = newValue.file && (document.getElementById('import-file') as HTMLInputElement).files[0] || null
        scope.importFileName = scope.importFile && (scope.importFile.name + ', ' + scope.importFile.size + ' bytes') || ''
      }
    })
  }
  clearMessages(): void {
    this.showExportErrorMsg = false
    this.showImportErrorMsg = false
    this.showImportSuccessMsg = false
  }
  exportDb(): void {
    this.commandService.execCommand(
      (response: boolean | string) => {
        if (response) {
          let file = document.createElement('a')

          this.clearMessages()

          file.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(response))
          file.setAttribute('download', this.exportFileName)
          file.style.display = 'none'
          document.body.appendChild(file)
          file.click()
          document.body.removeChild(file)
        } else {
          this.clearMessages()
          this.showExportErrorMsg = true
        }
      },
      CommandService.DATA_TYPE_DB,
      {
        command: CommandService.COMMAND_DUMP,
        options: null
      }
    )
  }
  importDb(): void {
    this.importFile.text().then((dump: string) => {
      this.commandService.execCommand(
        (response: boolean) => {
          this.clearMessages()
          if (response) {
            this.showImportSuccessMsg = true
            this.formImport.setValue({ file: '' })
          } else {
            this.showImportErrorMsg = true
          }
        },
        CommandService.DATA_TYPE_DB,
        {
          command: CommandService.COMMAND_RESTORE,
          options: { dump }
        }
      )
    })
  }
  resetDb(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '80%',
      data: {
        header: this.staticData.resetConfirmHeader,
        text: this.staticData.resetConfirmText,
        bttnCancel: this.staticData.resetConfirmCancel,
        bttnOk: this.staticData.resetConfirmOk,
        handler: () => {
          this.commandService.execCommand(
            (isReset: boolean) => {
              if (isReset) {
                dialogRef.close()
                this.settingsService.clearSettings()
              }
            },
            CommandService.DATA_TYPE_DB,
            {
              command: CommandService.COMMAND_RESET,
              options: null
            }
          )
        }
      }
    })
  }

}
