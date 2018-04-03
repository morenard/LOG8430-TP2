import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Song } from '../interfaces/song';
import { Playlist } from '../interfaces/playlist';


@Injectable()
export class SharedDataService {

  // manage song lecture
  private song = new BehaviorSubject<Song> ({
      title: '...',
      author: '...',
      album: '...',
      id: 0,
      source: '...',
      audioSrc: '...'}
  );
  currentSong = this.song.asObservable();

  private togglePlayPause = new Subject<any>();
  toggle = this.togglePlayPause.asObservable();

  private songPlaying = new Subject<boolean>();
  playing = this.songPlaying.asObservable();

  // manage 'database' of playlists (no one has access to this)
  private library: { [id: string]: Song[]; } = {};

  // playlists observable list to display when adding a song
  private playlistsList: Subject<string[]> = new Subject<string[]>();
  observableList = this.playlistsList.asObservable();

  // playlist to pass as parameter so it can be displayed in page
  private playlist: Subject<Playlist> = new Subject<Playlist>();
  currentPlaylist = this.playlist.asObservable();


  constructor() {
    this.songPlaying.next(false);
  }

  play() {
    this.togglePlayPause.next();
    this.updatePlay();
  }

  updatePlay() {
    this.songPlaying.next(!this.songPlaying);
  }

  // methods to update display
  changeCurrentSong(song: Song) {
    this.song.next(song);
  }

  changeCurrentPlaylist(selectedPlaylist: Playlist) {
    const tmp: Playlist = {
      name : selectedPlaylist.name,
      content : this.library[selectedPlaylist.name]
    };
    this.playlist.next(tmp);
  }

  updatePlaylistsList() {
    this.playlistsList.next(Object.keys(this.library));
  }

  // methods to save and update playlists in our "database"
  addPlaylist(name: string) {
    this.library[name] = [];

    // update list for display purpose
    this.updatePlaylistsList();
  }

  addSongToPlaylist(song: Song, name: string) {
    // retreive playlist, update with new song and save updated playlist
    const tmpSongs: Song[] = this.library[name];
    tmpSongs.push(song);
    this.library[name] = tmpSongs;
  }
}
