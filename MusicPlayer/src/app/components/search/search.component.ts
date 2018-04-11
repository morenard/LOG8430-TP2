import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { JamendoService } from '../../services/jamendo.service';
import { DeezerService } from '../../services/deezer.service';
import { SpotifyService } from '../../services/spotify.service';
import { SharedDataService } from '../../services/shared-data.service';

import { Song } from '../../interfaces/song';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./../../../../node_modules/primeng/resources/components/autocomplete/autocomplete.css',
              './search.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit {

  text: string;
  tracks: any[];
  results: Song[];
  audio: any;
  selectedSong: Song;

  constructor(
    private jamendoService: JamendoService,
    private deezerService: DeezerService,
    private spotifyService: SpotifyService,
    private sharedData: SharedDataService,
    private router: Router) {}

  ngOnInit() {
    this.sharedData.currentSong.subscribe(initialSelectedSong => this.selectedSong = initialSelectedSong);
  }

  onClick(value) {
    this.sharedData.changeCurrentSong(value);
    this.router.navigateByUrl('/songs');

    // reload playlists list
    this.sharedData.updatePlaylistsList();
  }

  search(event) {
    // initialize array
    this.results = [];

    // Search results from Jamendo API service
    this.fetchJamendoResults(event.query);

    // Search results from Deezer API service
    this.fetchDeezerResults(event.query);

    // Search results from Spotify API service
    this.fetchSpotifyResults(event.query);

    // delete duplicates
    this.results.filter((value, index, array) => {
      return !array.filter((v, i) => (value.title === v.title) && (value.author === v.author) && (value.album === v.album) && (i < index)).length;
    });

    // sort array
    this.results.sort((a, b): number => {
      const tmp1 = a.title.toLowerCase(), tmp2 = b.title.toLowerCase();
      return tmp1.localeCompare(tmp2);
    });
  }

  fetchJamendoResults(query: string) {
    this.jamendoService.getSearchResults(query).then((resp) => {
      const list: Song[] = [];
      if (resp.data) {
        for (let i = 0; i < resp.data.length; i++) {
          const song: Song = {  title: resp.data[i].name,
                                author: resp.data[i].artist_name,
                                album: resp.data[i].album_name,
                                source: 'Jamendo',
                                id: resp.data[i].id,
                                audioSrc: resp.data[i].audio,
                                releasedate: resp.data[i].releasedate
                              };
          list.push(song);
        }
      }
      this.results = [...this.results, ...list];
    });
  }

  fetchDeezerResults(query: string) {
    this.deezerService.getSearchResults(query).then((resp) => {
      const list: Song[] = [];
      if (resp.data) {
        for (let i = 0; i < resp.data.length; i++) {
          const song: Song = {  title: resp.data[i].title,
                                author: resp.data[i].artist.name,
                                album: resp.data[i].album.title,
                                source: 'Deezer',
                                id: resp.data[i].id,
                                audioSrc: resp.data[i].preview,
                                /*will display undefined because deezer doesnt send release date attribute on search request*/
                                releasedate: String(resp.data[i].release_date)
                              };
          list.push(song);
        }
      }
      this.results = [...this.results, ...list];
    });
  }

  fetchSpotifyResults(query: string) {
    this.spotifyService.getSearchResults(query).then((resp) => {
      const list: Song[] = [];
      if (resp.data) {
        for (let i = 0; i < resp.data.length; i++) {
          const song: Song = {  title: resp.data[i].name,
                                author: resp.data[i].artists[0].name,
                                album: resp.data[i].album.name,
                                source: 'Spotify',
                                id: resp.data[i].id,
                                audioSrc: resp.data[i].preview_url,
                                releasedate: resp.data[i].album.release_date
                              };
          list.push(song);
        }
      }
      this.results = [...this.results, ...list];
    });
  }
}
