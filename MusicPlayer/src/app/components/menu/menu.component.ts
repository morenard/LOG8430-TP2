import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { Playlist } from '../../interfaces/playlist';
import { Song } from '../../interfaces/song';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css',
  './../../../../node_modules/primeng/resources/components/grid/grid.css']
})

export class MenuComponent implements OnInit {

  // syntax menu
  items: MenuItem[];

  // selected playlist and its songs
  selectedPlaylist: Playlist;

  constructor(
    private sharedData: SharedDataService,
  ) {
      this.selectedPlaylist = {
        name: 'Default',
        content: []
      } ;
  }

  ngOnInit() {
    // create default playlists
    this.items = [];
  }

  // verify if a playlist exists
  existingPlaylist(name: string) {
    const found = this.items.filter(tmp => (tmp.label === name));
    if (found.length === 0) {
      return true;
    }
    return false;
  }

  // add new playlist
  addPlaylist() {
    // create and add an menu item for the new playlist
    const input = document.getElementById('newplaylist') as HTMLInputElement;
    if (input.value !== '') {
      // creating new playlist item
      const item = {
        label: input.value as string,
        icon: 'fa-list-ul',
        routerLink: ['/playlists'],
        routerLinkActiveOptions: { exact: true }
      };

      // saving playlist without creating doublons
      if (this.existingPlaylist(input.value as string)) {
        this.items.push(item);
        this.sharedData.addPlaylist(input.value as string);
      }
    }

    // clear input entry
    (document.getElementById('newplaylist') as HTMLInputElement).value = '';
  }

  // method called on click of a menu item, in other words a playlist
  selectPlaylist(event) {
    this.selectedPlaylist.name = event.target.innerText;
    this.sharedData.changeCurrentPlaylist(this.selectedPlaylist);
  }
}
