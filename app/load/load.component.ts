import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadService } from '../load.service';
import { LoadEntryFullData } from '../models/load-entry-full-data.public';
import { appData } from '../data/app';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {
  loadId: string
  load: LoadEntryFullData
  loadInStorageStatusId: string = '1'
  showLoad: boolean = false
  showErrorMessage: boolean = false
  staticData: any = appData.load

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadService: LoadService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadId = params.get('loadId')
      this.readLoad()
    })
  }
  readLoad() {
    this.loadService.readLoad(
      (loadData: LoadEntryFullData) => {
        if (loadData) {
          this.load = loadData
          this.showLoad = true
        } else {
          this.load = null
          this.showErrorMessage = true
        }
      },
      { id: this.loadId }
    )
  }
  deleteLoad() {
    if (window.confirm('Are you sure you want delete this load?')) {
      this.loadService.deleteLoad(
        (isDeleted: boolean) => { if (isDeleted) this.router.navigate(['loads']) },
        { id: this.loadId }
      )
    }
  }

}
