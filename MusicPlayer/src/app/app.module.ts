import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule} from 'primeng/accordion';
import { MenuItem} from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

import { JamendoService } from './services/jamendo.service';
import { DeezerService } from './services/deezer.service';
import { SharedDataService } from './services/shared-data.service';

import { HttpModule } from '@angular/http';
import { DeezerApiModule } from 'angular-deezer-api';

import { GridComponent } from './grid/grid.component';
import { PlaybarComponent } from './playbar/playbar.component';
import { MenuComponent } from './menu/menu.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SongsComponent } from './songs/songs.component';

const appRoutes: Routes = [
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'songs', component: SongsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    GridComponent,
    PlaybarComponent,
    MenuComponent,
    PlaylistsComponent,
    SongsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AutoCompleteModule,
    HttpModule,
    PanelMenuModule,
    ButtonModule,
    DeezerApiModule.forRoot(),
    RouterModule.forRoot( appRoutes )
  ],
  providers: [
    JamendoService,
    DeezerService,
    SharedDataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
