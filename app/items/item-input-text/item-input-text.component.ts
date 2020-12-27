import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

import { ItemFormControl } from 'src/app/models/item-form-control.system';
import { FormItemInputTextData } from 'src/app/models/form-item-input-text-data.system';

@Component({
  selector: 'app-item-input-text',
  templateUrl: './item-input-text.component.html',
  styleUrls: ['./item-input-text.component.scss']
})
export class ItemInputTextComponent implements OnInit {
  @Input() data: FormItemInputTextData

  @Output() controlOutputEvent = new EventEmitter<ItemFormControl>()

  control: FormControl

  constructor() { }

  ngOnInit(): void {
    let validators: Array<ValidatorFn> = []

    if (this.data.required) validators.push(Validators.required)
    if (this.data.min) validators.push(Validators.min(this.data.min))
    if (this.data.validPattern) validators.push(Validators.pattern(this.data.validPattern))

    if (this.data.disabled) {
      this.control = new FormControl({
        value: '',
        disabled: true
      })
    } else {
      this.control = new FormControl('', validators)
    }
    this.controlOutputEvent.emit({
      instance: this.control,
      name: this.data.property
    })
  }

}
