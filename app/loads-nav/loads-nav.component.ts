import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SettingsService } from 'src/app/services/settings.service';
import { LoadService } from 'src/app/services/load.service';
import { HotkeysService } from 'src/app/services/hotkeys.service';
import { SettingsListData } from 'src/app/models/settings-list-data.system';
import { appData } from 'src/app/data/app';

@Component({
  selector: 'app-loads-nav',
  templateUrl: './loads-nav.component.html',
  styleUrls: ['./loads-nav.component.scss']
})
export class LoadsNavComponent implements OnInit, OnDestroy {
  @Input() edit: boolean

  staticData = appData.loadsNav
  settings: SettingsListData
  loadId: string
  loadsIds: Array<string>
  loadIndex: number

  private subs: Array<Subscription> = []

  private goTo(prev?: boolean): void {
    let route: Array<string> = ['loads']

    if (prev) {
      if (this.loadIndex - 1 >= 0) {
        route.push(this.loadsIds[this.loadIndex - 1])
      }
    } else {
      if (this.loadIndex + 1 < this.loadsIds.length) {
        route.push(this.loadsIds[this.loadIndex + 1])
      }
    }

    if (this.edit) route.push('edit')
    if (this.edit && route.length === 3 || !this.edit && route.length === 2) {
      this.router.navigate(route)
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService,
    private loadService: LoadService,
    private hotkeysService: HotkeysService
  ) { }

  ngOnInit(): void {
    this.settingsService.readSettings(
      (settingsData: SettingsListData) => {
        this.settings = settingsData

        if (this.settings.loadsNavButtons || this.settings.loadsNavHotkeys) {
          this.loadService.getLoadsIds((loadsIdsData: Array<string>) => {
            this.loadsIds = loadsIdsData
            this.getLoadIndex()
          })

          this.subs[this.subs.length] = this.route.paramMap.subscribe(params => {
            this.loadId = params.get('loadId')
            this.getLoadIndex()
          })
        }

        if (this.settings.loadsNavHotkeys) this.subs.push(
          this.hotkeysService.subscribe(['ArrowLeft', 'ArrowRight'], (e: KeyboardEvent) => {
            switch (e.code) {
              case 'ArrowLeft':
                this.goToPrevLoad()
                break;

              case 'ArrowRight':
                this.goToNextLoad()
                break;
            }
          })
        )
      }
    )
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  getLoadIndex(): void {
    if (this.loadsIds && this.loadId) {
      this.loadIndex = this.loadsIds.findIndex(id => id === this.loadId)
    }
  }
  goToPrevLoad(): void {
    this.goTo(true)
  }
  goToNextLoad(): void {
    this.goTo()
  }

}
