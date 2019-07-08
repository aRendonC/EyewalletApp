// Dependencies.
import {Injectable} from '@angular/core';

// Http client.
import {HttpClient, HttpHeaders} from '@angular/common/http';

// Enviroments.
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AxiosService {
  private url: string = environment.urlBase;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }

  public get(endpoint: string, user?: any, params?: any) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}${endpoint}`;
      if (user != null) {
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.accessParam()
        })
      }
      if (params) {
        const urlParams = JSON.stringify(params);
        if (user) {
          url += '?' + urlParams;
        } else {
          url += '?' + urlParams;
        }
      }
      this.http.get(url, {
        headers: this.headers
      }).toPromise()
        .then(value => {
          resolve(value);
        }).catch(err => {
      });
    });
  }

  public post(endpoint: string, body: object, user?: any): Promise<any> {
    const url = `${this.url}${endpoint}`;
    if (user != null) {
      this.headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + user.accessParam()
      });
    }
    console.log('body post', body);
    return this.http.post(url, (body != null) ? body : body, {
      headers: this.headers
    }).toPromise();
  }

  public put(endpoint: string, body: object, user?: any): Promise<any> {
    const url = `${this.url}${endpoint}`;
    if (user) {
      this.headers = new  HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + user.accessParam()
      });
    }
    console.log(body);
    console.log(user);
    return this.http.put(url, (body != null) ? body : body, {
      headers: this.headers
    }).toPromise();
  }

  public jsonToURLEncoded (jsonString) {
    return Object.keys(jsonString).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }
}


