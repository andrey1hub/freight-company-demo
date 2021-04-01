import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormItemDatepickerData } from 'src/app/models/form-item-datepicker-data.system';
import { ItemFormControl } from 'src/app/models/item-form-control.system';

@Component({
  selector: 'app-item-datepicker',
  templateUrl: './item-datepicker.component.html',
  styleUrls: ['./item-datepicker.component.scss']
})
export class ItemDatepickerComponent implements OnInit {
  @Input() data: FormItemDatepickerData

  @Output() controlOutputEvent = new EventEmitter<ItemFormControl>()

  controlStart: FormControl
  controlEnd: FormControl

  propertyStart: string
  propertyEnd: string

  constructor() { }

  ngOnInit(): void {
    let props: Array<string> = this.data.property.split(',')

    this.propertyStart = props[0]
    this.propertyEnd = props[1]

    this.controlStart = new FormControl(null)
    this.controlEnd = new FormControl(null)

    this.controlOutputEvent.emit({
      instance: this.controlStart,
      name: this.propertyStart
    })
    this.controlOutputEvent.emit({
      instance: this.controlEnd,
      name: this.propertyEnd
    })
  }

}
