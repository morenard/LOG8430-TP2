import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Song } from '../interfaces/song';
import { Playlist } from '../interfaces/playlist';


@Injectable()
export class SharedDataService {

  private playlist: Subject<Playlist> = new Subject<Playlist>();
  currentPlaylist = this.playlist.asObservable();

  private song: Subject<any> = new Subject<any>();
  currentSong = this.song.asObservable();

  constructor() { }

  changeCurrentSong(song: Song) {
    this.song.next(song);
  }

}
