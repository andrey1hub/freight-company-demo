import { Component, OnInit } from '@angular/core';

import { UtilityService } from 'src/app/utility.service';
import { systemMenu } from 'src/app/data/system-menu';
import { MenuBundle } from '../models/menu-bundle.system';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  menu: MenuBundle

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menu = UtilityService.buildMenu(systemMenu, systemMenu.findIndex(item => this.router.isActive(item.link, true)))
  }

}
