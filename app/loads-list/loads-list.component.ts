import { Component, OnInit } from '@angular/core';

import { LoadService } from 'src/app/services/load.service';
import { LoadEntryFullData } from 'src/app/models/load-entry-full-data.public';
import { FilterLoadsData } from 'src/app/models/filter-loads-data.system';
import { appData } from 'src/app/data/app';

@Component({
  selector: 'app-loads-list',
  templateUrl: './loads-list.component.html',
  styleUrls: ['./loads-list.component.scss']
})
export class LoadsListComponent implements OnInit {
  loads: Array<LoadEntryFullData>
  loadInStorageStatusId: string = '1'
  loadsHandler: Function = (loadsData: Array<LoadEntryFullData>) => { this.loads = loadsData }
  staticData = appData.loadsList

  constructor(private loadService: LoadService) { }

  ngOnInit(): void {
    this.loadService.readLoadsList(this.loadsHandler)
  }
  filterLoadsList(filterData: FilterLoadsData): void {
    if (this.loads) this.loadService.getFilteredLoadsList(this.loadsHandler, filterData)
  }

}
