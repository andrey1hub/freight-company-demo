import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss']
})
export class MainItemComponent {
  @Input() supSign: string
  @Input() units: string
  @Input() label: string
  @Input() value: string

  constructor() { }

}
