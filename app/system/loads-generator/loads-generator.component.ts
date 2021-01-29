import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { loadsgenForm } from 'src/app/data/loadsgen-form';
import { LoadService } from 'src/app/services/load.service';
import { CommandService } from 'src/app/services/command.service';
import { FormItemDatepickerData } from 'src/app/models/form-item-datepicker-data.system';
import { FormItemInputTextData } from 'src/app/models/form-item-input-text-data.system';
import { ItemFormControl } from 'src/app/models/item-form-control.system';
import { UtilityService } from 'src/app/services/utility.service';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-loads-generator',
  templateUrl: './loads-generator.component.html',
  styleUrls: ['./loads-generator.component.scss']
})
export class LoadsGeneratorComponent implements OnInit {
  staticData = loadsgenForm.static
  formedSpan: FormItemDatepickerData = UtilityService.uniqueCopy(loadsgenForm.formedSpan)
  inputsData: Array<FormItemInputTextData> = UtilityService.uniqueCopy(loadsgenForm.inputs)
  form: FormGroup
  settings: SettingsListData

  constructor(
    private settingsService: SettingsService,
    private commandService: CommandService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.settingsService.readSettings(
      (settingsData: SettingsListData) => {
        this.settings = settingsData
      }
    )

    this.form = new FormGroup({})
  }
  addFormControl(control: ItemFormControl) {
    this.form.addControl(control.name, control.instance)
  }
  onFormSubmit(): void {
    this.commandService.execCommand(
      (isGenerated: boolean) => { if (isGenerated) this.router.navigate(['loads']) },
      LoadService.SERVICE_DATA_TYPE,
      {
        command: CommandService.COMMAND_GENERATE,
        options: this.form.getRawValue()
      }
    )
  }

}
