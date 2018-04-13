import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-playbar',
  templateUrl: './playbar.component.html',
  styleUrls: ['./../../../../node_modules/plyr/dist/plyr.css',
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
    this.sharedData.currentSong.subscribe((selectedSong) => { this.selectedSong = selectedSong; } );
    this.sharedData.toggle.subscribe(() => { this.toggle(); });
  }

  toggle() {
    if (this.selectedSong.source !== '...') {
      if (this.isStopped) {
        console.log('Playing ' + this.selectedSong.title);
        this.audio.src = this.selectedSong.audioSrc;
        this.audio.onended = () => {
          this.isStopped = true;
          this.buttonImagePlayPause = 'fa fa-play';
        };
        this.audio.load();
        this.audio.volume = 0.2;
        this.audio.play();
        this.isStopped = false;
        this.buttonImagePlayPause = 'fa fa-pause';

        // to change value of 'playing'
        this.sharedData.updatePlay(true);

      } else {
        console.log('Pausing ' + this.selectedSong.title);
        this.audio.pause();
        this.isStopped = true;
        this.buttonImagePlayPause = 'fa fa-play';

        // to change value of 'playing'
        this.sharedData.updatePlay(false);
      }
    }
  }
}
