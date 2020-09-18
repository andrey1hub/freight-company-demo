import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadResponseEntryData, LoadService } from '../load.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {
  loadId: String
  load: LoadResponseEntryData
  loadInStorageStatusId: String = '1'
  showLoad: Boolean = false
  showErrorMessage: Boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadService: LoadService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadId = params.get('loadId')
      this.readLoad(this.loadId)
    })
  }
  readLoad(loadId: String) {
    let scope: LoadComponent = this
    let subscription: Subscription = this.loadService.readLoad(loadId).subscribe({
      next(loadData) {
        if (loadData) {
          scope.load = loadData.data
          scope.showLoad = true
        } else {
          scope.load = null
          scope.showErrorMessage = true
        }
      },
      complete() {
        subscription.unsubscribe()
      }
    })
  }
  deleteLoad() {
    let scope: LoadComponent = this
    let subscription: Subscription

    if (window.confirm('Are you sure you want delete this load?')) {
      subscription = this.loadService.deleteLoad(this.loadId).subscribe({
        next(isDeleted) {
          if (isDeleted) scope.router.navigate(['loads'])
        },
        complete() {
          subscription.unsubscribe()
        }
      })
    }
  }

}
