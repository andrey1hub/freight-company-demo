import { Component, Input, OnInit } from '@angular/core';

import { FormItemRangeData } from 'src/app/models/form-item-range-data.system';

@Component({
  selector: 'app-item-range',
  templateUrl: './item-range.component.html',
  styleUrls: ['./item-range.component.scss']
})
export class ItemRangeComponent implements OnInit {
  @Input() data: FormItemRangeData

  constructor() { }

  ngOnInit(): void {
  }

}
