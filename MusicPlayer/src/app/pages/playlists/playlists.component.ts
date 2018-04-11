import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Playlist } from '../../interfaces/playlist';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  playlist: Playlist;

  constructor(private sharedData: SharedDataService) { }

  ngOnInit() {
    this.sharedData.currentPlaylist.subscribe(initialSelectedPlaylist => this.playlist = initialSelectedPlaylist);
  }

  display() {
    // console.log(this.playlist.name as string);
    // document.getElementById('playlistName').innerHTML = this.playlist.name;
  }

}
