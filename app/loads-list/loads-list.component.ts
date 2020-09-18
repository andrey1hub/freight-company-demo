import { Component, OnInit } from '@angular/core';
import { LoadService, LoadResponseEntryData } from '../load.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loads-list',
  templateUrl: './loads-list.component.html',
  styleUrls: ['./loads-list.component.scss']
})
export class LoadsListComponent implements OnInit {
  loads: Array<LoadResponseEntryData>
  loadInStorageStatusId: String = '1'

  constructor(private loadService: LoadService) { }

  ngOnInit(): void {
    let scope: LoadsListComponent = this
    let subscription: Subscription = this.loadService.readLoadsList().subscribe({
      next(loadsData) {
        scope.loads = loadsData.data
      },
      complete() {
        subscription.unsubscribe()
      }
    })
  }

}
