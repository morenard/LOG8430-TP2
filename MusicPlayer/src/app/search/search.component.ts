import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { JamendoService } from '../services/jamendo.service';
import { DeezerService } from '../services/deezer.service';
import { DeezerApiService } from 'angular-deezer-api';
import { SharedDataService } from '../services/shared-data.service';
import { Song } from '../interfaces/song';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./../../../node_modules/primeng/resources/components/autocomplete/autocomplete.css',
              './search.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit {

  text: string;
  tracks: any[];
  results: Song[];
  audio: any;

  selectedSong: Song;

  constructor(private jamendoService: JamendoService,
    private deezerService: DeezerApiService,
    private deezerBadService: DeezerService,
    private sharedData: SharedDataService) {
  }

  ngOnInit() {
    this.sharedData.currentSong.subscribe(initialSelectedSong => this.selectedSong = initialSelectedSong);
  }

  onClick(value) {
    this.sharedData.changeCurrentSong(value);

  }

  search(event) {
    this.results = [];
    // Search results from Jamendo API service
    this.fetchJamendoResults(event.query);
    // Search results from Deezer API service
    this.fetchDeezerResults(event.query);
  }

  fetchJamendoResults(query: string) {
    this.jamendoService.getSearchResults(query).subscribe((data) => {
      const list: Song[] = [];
      console.log(data.json());
      if (data.json().results) {
        for (let i = 0; i < data.json().results.length; i++) {
          const song: Song = {  title: data.json().results[i].name,
                                source: 'JAMENDO',
                                id: data.json().results[i].id,
                                audioSrc: data.json().results[i].audio
                              };
          list.push(song);
        }
      }
      this.results = [...this.results, ...list];
    });
  }

  fetchDeezerResults(query: string) {
    this.deezerService.search(query).then(data => {
      if (data.data.length !== 0) {
        // console.log(data.data);
        // Limit search results to 10, doesn't seem to work when limiting with the request
        const LIMIT = 10;
        const list: Song[] = [];

        for (let i = 0; i < LIMIT; i++) {
          const song: Song = {  title: data.data[i].title,
                                id: data.data[i].id,
                                source: 'DEEZER',
                                audioSrc: data.data[i].preview};
          list.push(song);
        }
        this.results = [...this.results, ...list];
      }
    });
  }

  fetchJamendoSong(id: string) {
    this.jamendoService.getSongDetails(id).subscribe((data) => {
      console.log(data.json());
    });
  }

}
