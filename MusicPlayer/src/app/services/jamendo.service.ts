import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';


@Injectable()
export class JamendoService {

  private client_id = '90b6c04d';

  constructor() {}

  getSearchResults(query: string) {
    const config: AxiosRequestConfig = { params: { client_id: this.client_id, grant_type: query } };
    const response = axios.get('http://localhost:3000/api/v1/jamendo/search/songs', config);

    if (response) { return response; }
  }
}
