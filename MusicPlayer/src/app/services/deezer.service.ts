import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';


@Injectable()
export class DeezerService {

  // no need for client_id to get previews
  private client_id = '';

  constructor() { }

  getSearchResults(query: string) {
    const config: AxiosRequestConfig = { params: { grant_type: query } };
    const response = axios.get('http://localhost:3000/api/v1/deezer/search/songs', config);

    if (response) { return response; }
  }
}
