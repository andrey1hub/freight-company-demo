import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { EditLoadComponent } from './edit-load/edit-load.component';
import { LoadComponent } from './load/load.component';
import { LoadsListComponent } from './loads-list/loads-list.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'loads', component: LoadsListComponent },
  { path: 'loads/new', component: EditLoadComponent },
  { path: 'loads/:loadId', component: LoadComponent },
  { path: 'loads/:loadId/edit', component: EditLoadComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
