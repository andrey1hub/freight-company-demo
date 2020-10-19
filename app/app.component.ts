import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle(UtilityService.APP_NAME.concat(' ').concat(UtilityService.APP_VERSION))
  }
}
