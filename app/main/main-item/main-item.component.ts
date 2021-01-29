import { Component, Input } from '@angular/core';

import { MainItemTextData } from 'src/app/models/main-item-text-data.system';

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss']
})
export class MainItemComponent {
  @Input() data: MainItemTextData
  @Input() units: string
  @Input() value: string

  constructor() { }

}
