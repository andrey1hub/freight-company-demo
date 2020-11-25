import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { EditLoadComponent } from './edit-load/edit-load.component';
import { LoadComponent } from './load/load.component';
import { LoadsListComponent } from './loads-list/loads-list.component';
import { SystemComponent } from './system/system.component';
import { SettingsComponent } from './system/settings/settings.component';
import { LoadsGeneratorComponent } from './system/loads-generator/loads-generator.component';
import { ExportImportDbComponent } from './system/export-import-db/export-import-db.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'loads', component: LoadsListComponent },
  { path: 'loads/new', component: EditLoadComponent },
  { path: 'loads/:loadId', component: LoadComponent },
  { path: 'loads/:loadId/edit', component: EditLoadComponent },
  {
    path: 'system',
    component: SystemComponent,
    children: [
      {
        path: '',
        component: SettingsComponent
      },
      {
        path: 'loadsgen',
        component: LoadsGeneratorComponent
      },
      {
        path: 'db',
        component: ExportImportDbComponent
      }
    ]
  },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
