import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoadComponent } from './load/load.component';
import { MainComponent } from './main/main.component';
import { EditLoadComponent } from './edit-load/edit-load.component';
import { LoadsListComponent } from './loads-list/loads-list.component';
import { SystemComponent } from './system/system.component';
import { TitlePipe } from './title.pipe';
import { MainItemComponent } from './main/main-item/main-item.component';
import { MainItemSelectableComponent } from './main/main-item-selectable/main-item-selectable.component';
import { ItemInputTextComponent } from './items/item-input-text/item-input-text.component';
import { ItemSelectComponent } from './items/item-select/item-select.component';
import { LoadsFilterComponent } from './loads-list/loads-filter/loads-filter.component';
import { ItemDatepickerComponent } from './items/item-datepicker/item-datepicker.component';
import { SettingsComponent } from './system/settings/settings.component';
import { LoadsGeneratorComponent } from './system/loads-generator/loads-generator.component';
import { ItemCheckboxComponent } from './items/item-checkbox/item-checkbox.component';
import { ExportImportDbComponent } from './system/export-import-db/export-import-db.component';
import { ConfirmDialogComponent } from './mat/confirm-dialog/confirm-dialog.component';
import { ItemRangeComponent } from './items/item-range/item-range.component';
import { LoadsNavComponent } from './loads-nav/loads-nav.component';
import { DefaultValueComponent } from './items/default-value/default-value.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoadComponent,
    MainComponent,
    EditLoadComponent,
    LoadsListComponent,
    SystemComponent,
    TitlePipe,
    MainItemComponent,
    MainItemSelectableComponent,
    ItemInputTextComponent,
    ItemSelectComponent,
    LoadsFilterComponent,
    ItemDatepickerComponent,
    SettingsComponent,
    LoadsGeneratorComponent,
    ItemCheckboxComponent,
    ExportImportDbComponent,
    ConfirmDialogComponent,
    ItemRangeComponent,
    LoadsNavComponent,
    DefaultValueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
