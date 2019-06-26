import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AxiosService {
  url = 'http://localhost:3000/';
  headers: HttpHeaders;

  constructor(private http: HttpClient,
              // private env: baseUrl,
  ) {
    this.headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  }

  get(endpoint: string, user?: any, params?: any) {
    return new Promise((resolve, reject) => {
      let url = this.url + endpoint;
      if (user != null) {
        url += user.accessParam();
      }
      if (params) {
        const urlParams = this.jsonToURLEncoded(params);
        if (user) {
          url += '&' + urlParams;
        } else {
          url += '?' + urlParams;
        }
      }
      this.http.get(url).toPromise()
        .then(value => {
          resolve(value);
        }).catch(err => {
      });
    });
  }

  post(endpoint: string, body: any, user?: any): Promise<any> {
    const url = this.url + endpoint;
    if (user != null) {
      this.headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: 'Bearer ' + user.accessParam()
      });
    }
    return this.http.post(url, (body != null) ? this.jsonToURLEncoded(body) : body, {
      headers: this.headers
    }).toPromise();
  }

  jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key])).join('&');
  }


}


