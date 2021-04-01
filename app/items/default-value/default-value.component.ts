import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-default-value',
  templateUrl: './default-value.component.html',
  styleUrls: ['./default-value.component.scss']
})
export class DefaultValueComponent implements OnInit {
  @Input() controls: Array<FormControl>
  @Input() defaults: Array<string>

  isDefault: boolean

  constructor() { }

  ngOnInit(): void {
    this.controls.forEach(control => control.valueChanges.subscribe({ next: () => this.checkValue() }))
    this.checkValue()
  }

  checkValue(): void {
    this.isDefault = this.controls.every((control, index) => control.value === this.defaults[index])
  }
  defaultValue(): void {
    this.controls.forEach((control, index) => control.setValue(this.defaults[index]))
  }

}
