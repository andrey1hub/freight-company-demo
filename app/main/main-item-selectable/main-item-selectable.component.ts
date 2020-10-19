import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OptionItemData } from 'src/app/models/option-item-data.system';

@Component({
  selector: 'app-main-item-selectable',
  templateUrl: './main-item-selectable.component.html',
  styleUrls: ['./main-item-selectable.component.scss']
})
export class MainItemSelectableComponent implements OnInit, OnChanges {
  @Input() label: string
  @Input() values: any
  @Input() options: Array<OptionItemData>

  control: FormControl
  showTotal: number
  recievedInitialData: boolean = false

  constructor() { }

  ngOnInit(): void {
    let scope: MainItemSelectableComponent = this

    this.control = new FormControl('')
    this.control.valueChanges.subscribe({
      next(newValue) {
        scope.showTotal = scope.values && scope.values[newValue] || 0
      }
    })
  }
  ngOnChanges(): void {
    if (!this.recievedInitialData && this.options?.length && this.values) {
      this.control.setValue(this.options[0].id)
      this.recievedInitialData = true
    }
  }

}
