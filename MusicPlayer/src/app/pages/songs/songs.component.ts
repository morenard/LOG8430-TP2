import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css',
    './../../../../node_modules/primeng/resources/components/button/button.css']
})
export class SongsComponent implements OnInit {

  selectedSong: Song;
  toggle: Function;

  constructor(
    private sharedData: SharedDataService
  ) {}

  ngOnInit() {
    this.sharedData.currentSong.subscribe(initialSelectedSong => this.selectedSong = initialSelectedSong);
  }

  onPlay() {
    this.sharedData.play();
  }
}
