import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../services/shared-data.service';
import { Song } from '../../../interfaces/song';
import {SelectItem} from 'primeng/api';
import {Message} from 'primeng/components/common/api';
import {MessagesModule} from 'primeng/messages';


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css',
    './../../../../../node_modules/primeng/resources/components/button/button.css',
    './../../../../../node_modules/primeng/resources/components/message/message.css']
})
export class SongsComponent implements OnInit {

  // display existing playlists
  playlists: SelectItem[];

  // store chosen playlist
  selectedPlaylist: string;

  // to allow alerts
  message: Message[] = [];

  // current song
  selectedSong: Song;
  toggle: Function;


  constructor(
    private sharedData: SharedDataService
  ) {}

  ngOnInit() {
    this.sharedData.currentSong.subscribe(initialSelectedSong => this.selectedSong = initialSelectedSong);
    this.sharedData.observableList.subscribe(allPlaylists => this.playlists = this.convertToItem(allPlaylists));

    // reload playlists list
    this.sharedData.updatePlaylistsList();
  }

  // play song
  onPlay() {
    this.sharedData.play();
  }

  // allow to convert from string[] to selectItem[] to be able to display data
  convertToItem(list: string[]) {
    const tmp: SelectItem[] = [];
    for (const val of list) {
      if (val !== '') {
        const item = {
          label: val as string,
          value: val as string
        };
        tmp.push(item);
      }
    }
    return tmp;
  }

  // add a song to an existing playlist
  addSongToPlaylist() {
    this.sharedData.addSongToPlaylist(this.selectedSong as Song, this.selectedPlaylist as string);
    this.message.push({severity: 'info', summary: this.selectedSong.title, detail: 'added to Playlist ' + this.selectedPlaylist});
  }
}
