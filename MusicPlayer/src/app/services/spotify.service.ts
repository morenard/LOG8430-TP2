import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';


@Injectable()
export class SpotifyService {

  // no need for a client_i here, a token is generated server side
  private client_id = '';

  constructor() { }

  getSearchResults(query: string) {
    const config: AxiosRequestConfig = { params: { grant_type: query } };
    const response = axios.get('http://localhost:3000/api/v1/spotify/search/songs', config);

    if (response) { return response; }
  }
}
