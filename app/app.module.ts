import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoadComponent } from './load/load.component';
import { MainComponent } from './main/main.component';
import { EditLoadComponent } from './edit-load/edit-load.component';
import { LoadsListComponent } from './loads-list/loads-list.component';
import { SettingsComponent } from './settings/settings.component';
import { TitlePipe } from './title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoadComponent,
    MainComponent,
    EditLoadComponent,
    LoadsListComponent,
    SettingsComponent,
    TitlePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
