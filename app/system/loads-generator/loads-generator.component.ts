import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { loadsgenForm } from 'src/app/data/loadsgen-form';
import { LoadService } from 'src/app/load.service';
import { FormItemDatepicker } from 'src/app/models/form-item-datepicker-data.system';
import { FormItemInputTextData } from 'src/app/models/form-item-input-text-data.system';
import { ItemFormControl } from 'src/app/models/item-form-control.system';

@Component({
  selector: 'app-loads-generator',
  templateUrl: './loads-generator.component.html',
  styleUrls: ['./loads-generator.component.scss']
})
export class LoadsGeneratorComponent implements OnInit {
  bttnSubmit: string = loadsgenForm.bttnSubmit
  formedSpanDescription: Array<string> = loadsgenForm.formedSpanDescription
  formedSpan: FormItemDatepicker = loadsgenForm.formedSpan
  inputsData: Array<FormItemInputTextData> = loadsgenForm.inputs
  form: FormGroup

  constructor(private loadService: LoadService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({})
  }
  addFormControl(control: ItemFormControl) {
    this.form.addControl(control.name, control.instance)
  }
  onFormSubmit(): void {
    this.loadService.execCommand(
      (isGenerated: boolean) => { if (isGenerated) this.router.navigate(['loads']) },
      {
        command: LoadService.COMMAND_GENERATE,
        options: this.form.getRawValue()
      }
    )
  }

}
