import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormItemDatepicker } from 'src/app/models/form-item-datepicker-data.system';
import { ItemFormControl } from 'src/app/models/item-form-control.system';

@Component({
  selector: 'app-item-datepicker',
  templateUrl: './item-datepicker.component.html',
  styleUrls: ['./item-datepicker.component.scss']
})
export class ItemDatepickerComponent implements OnInit {
  @Input() data: FormItemDatepicker

  @Output() controlOutputEvent = new EventEmitter<ItemFormControl>()

  controlStart: FormControl
  controlEnd: FormControl

  constructor() { }

  ngOnInit(): void {
    this.controlStart = new FormControl('')
    this.controlEnd = new FormControl('')

    this.controlOutputEvent.emit({
      instance: this.controlStart,
      name: this.data.propertyStart
    })
    this.controlOutputEvent.emit({
      instance: this.controlEnd,
      name: this.data.propertyEnd
    })
  }

}
