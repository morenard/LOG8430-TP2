import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';

// import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeezerService {



  constructor(public http: Http, private jsonp: Jsonp) {
    /*
    let requestUrl = 'https://connect.deezer.com/oauth/auth.php?app_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&perms=basic_access,email';
    return this.http.get(requestUrl).toPromise().then(data => {
      console.log(data);
      return data.json();
      */
  }

  getSearchResults(query: string) {
    const requestUrl = `https://api.deezer.com/search?q=track:${query}&limit=10&strict=on`;
    return this.jsonp.get(requestUrl).toPromise().then(response => {
      return response.json();
    });


  }

}
