import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { Song } from '../interfaces/song';

@Component({
  selector: 'app-playbar',
  templateUrl: './playbar.component.html',
  styleUrls: ['./../../../node_modules/plyr/dist/plyr.css',
              './playbar.component.css']
})
export class PlaybarComponent implements OnInit {

  selectedSong: Song;

  audio: any;
  isStopped: boolean;
  buttonImagePlayPause: string;

  constructor(private sharedData: SharedDataService) {
    this.audio = new Audio();
    this.isStopped = true;
    this.buttonImagePlayPause = 'fa fa-play';
  }

  ngOnInit() {
    this.sharedData.currentSong.subscribe(initialSelectedSong => this.selectedSong = initialSelectedSong);
  }

  toggle() {
    if (this.isStopped) {
      console.log('Playing ' + this.selectedSong.title);
      this.audio.src = this.selectedSong.audioSrc;
      this.audio.load();
      this.audio.play();
      this.isStopped = false;
      this.buttonImagePlayPause = 'fa fa-pause';
    } else {
      console.log('Pausing ' + this.selectedSong.title);
      this.audio.pause();
      this.isStopped = true;
      this.buttonImagePlayPause = 'fa fa-play';
    }
  }

}
