import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { FormItemSelectData } from 'src/app/models/form-item-select-data.system';

import { ItemFormControl } from 'src/app/models/item-form-control.system';
import { OptionItemData } from 'src/app/models/option-item-data.system';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent implements OnInit {
  @Input() data: FormItemSelectData
  @Input() stack: Array<OptionItemData>

  @Output() controlOutputEvent = new EventEmitter<ItemFormControl>()

  control: FormControl

  constructor() { }

  ngOnInit(): void {
    let validators: Array<ValidatorFn> = []

    if (this.data.required) validators.push(Validators.required)
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
