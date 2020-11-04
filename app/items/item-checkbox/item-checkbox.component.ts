import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormItemCheckboxData } from 'src/app/models/form-item-checkbox-data.system';
import { ItemFormControl } from 'src/app/models/item-form-control.system';

@Component({
  selector: 'app-item-checkbox',
  templateUrl: './item-checkbox.component.html',
  styleUrls: ['./item-checkbox.component.scss']
})
export class ItemCheckboxComponent implements OnInit {
  @Input() data: FormItemCheckboxData

  @Output() controlOutputEvent = new EventEmitter<ItemFormControl>()

  control: FormControl

  constructor() { }

  ngOnInit(): void {
    if (this.data.disabled) {
      this.control = new FormControl({
        value: '',
        disabled: true
      })
    } else {
      this.control = new FormControl('')
    }
    this.controlOutputEvent.emit({
      instance: this.control,
      name: this.data.property
    })
  }

}
