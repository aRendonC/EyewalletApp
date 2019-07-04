import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  public arrayCountries: any = [];
  public arrayStates: any = [];
  public selectedCountry = '';
  public selectedState = '';
  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public countryCode = '';
  public stateCode = '';

  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private menu: MenuController,
    private router: Router,
    private touchCtrl: TouchLoginService,
    private aut: AuthService,
  ) { }

ngOnInit() {
  this.getCountries();
  this.menu.enable(false);
  this.touchCtrl.isLocked = true;
}
ionViewDidLeave() {
  this.menu.enable(true);
}

getCountries() {
  this.headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  const url = 'https://geodata.solutions/restapi?dd=1';
  this.http.get(url)
  .toPromise()
  .then(data => {
  // Toda la data (con codigo de pais y nombre de pais) que es obtenida de la url es pasada a la variable global paises
  this.countries = data;
  this.arrayCountries = data;
  });
}

private statesFn(arrayCountries, selectedCountry) {
  arrayCountries.forEach(element => {
    if (element[1] === selectedCountry) {
      this.countryCode = element[0];
  }});
}

getState(country: any) {
  this.selectedCountry = country.detail.value;
  this.statesFn(this.arrayCountries, this.selectedCountry);
  this.headers = new HttpHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  });
  const url = `https://geodata.solutions/restapi?dd=1&country=${this.countryCode}`;
  this.http.get(url).toPromise().then(data => {
  this.states = data;
  this.arrayStates = data;
});
}

private citiesFn(arrayStates, selectedState) {
  arrayStates.forEach(element => {
    if (element[1] === selectedState) {
      this.stateCode = element[0];
  }});
}

getCity(state: any) {
  this.selectedState = state.detail.value;
  this.citiesFn(this.arrayStates, this.selectedState);
  this.headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    });
  const url = `https://geodata.solutions/restapi?dd=1&country=${this.countryCode}&state=${this.stateCode}`;
  this.http.get(url).toPromise().then(data => {
  this.cities = data;
  });
}

}
