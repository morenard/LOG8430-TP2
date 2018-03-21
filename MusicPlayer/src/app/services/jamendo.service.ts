import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class JamendoService {

  private client_id = '90b6c04d';

  constructor(public http: Http) {}

  getSearchResults(query: string) {
    const requestUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${this.client_id}&format=jsonpretty&limit=2&speed=high+veryhigh&include=musicinfo&namesearch=${query}`;
    // const requestUrl = `https://api.jamendo.com/v3.0/autocomplete/?client_id=${this.client_id}&format=jsonpretty&limit=10&prefix=${query}`;
    // requestUrl += '&matchcount=1';
    // console.log(requestUrl);
    return this.http.request(requestUrl);
  }

  getSongDetails(id: string) {
    const requestUrl = `https://api.jamendo.com/v3.0/tracks/file/?client_id=${this.client_id}&id=${id}`;
    return this.http.request(requestUrl);
  }
}
