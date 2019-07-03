// Dependencies.
import { Injectable } from '@angular/core';

// http client.
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Enviroments.
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegistryService {
  private headers: any = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  );

  constructor(
    private http: HttpClient
  ) { }

  public registerWallet(data) {
    console.log('Saving...');

    const urlRegistry: string = `${environment.urlBase}auth/register`;
    const headersRegistry: any = {
      headers: this.headers
    };
    const dataBody = {
      "email": data.email,
      "phone": data.phone,
      "password": data.password
    }

    return this.http.post(urlRegistry, dataBody, headersRegistry);
  }
}
