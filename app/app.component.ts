import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { appData } from './data/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(appData.appName + ' ' + appData.appVersion)
  }
}
