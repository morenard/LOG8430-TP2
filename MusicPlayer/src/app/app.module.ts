import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { MessagesModule } from 'primeng/messages';

import { SharedDataService } from './services/shared-data.service';
import { JamendoService } from './services/jamendo.service';
import { DeezerApiModule } from 'angular-deezer-api';
import { DeezerService } from './services/deezer.service';
import { SpotifyService } from './services/spotify.service';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { GridComponent } from './components/grid/grid.component';
import { PlaybarComponent } from './components/playbar/playbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { PlaylistsComponent } from './components/pages/playlists/playlists.component';
import { SongsComponent } from './components/pages/songs/songs.component';

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
    DropdownModule,
    HttpModule,
    PanelMenuModule,
    ButtonModule,
    TreeTableModule,
    MessagesModule,
    DeezerApiModule.forRoot(),
    RouterModule.forRoot( appRoutes )
  ],
  providers: [
    SharedDataService,
    JamendoService,
    DeezerService,
    SpotifyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
