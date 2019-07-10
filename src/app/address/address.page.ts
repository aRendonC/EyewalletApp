import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {AxiosService} from '../services/axios/axios.service';
import {LoadingService} from "../services/loading/loading.service";

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
  public zip: any;
  public userId: any;
  public address1 = '';
  public address2 = '';
  public country = '';
  public state = '';
  public city = '';
  public user: any = '';
  public bodyForm: any = {};



  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private menu: MenuController,
    private router: Router,
    private touchCtrl: TouchLoginService,
    private aut: AuthService,
    private store: Storage,
    private aes: AesJsService,
    private axios: AxiosService,
    private loadingCtrl: LoadingService
  ) { }

async ngOnInit() {
  await this.getCountries();
  this.menu.enable(false);
  this.touchCtrl.isLocked = true;
}
ionViewDidLeave() {
  this.menu.enable(true);
}

async getCountries() {
  await this.loadingCtrl.present({})
  this.headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' ,
    'Access-Control-Allow-Headers': '*' ,
    'Access-Control-Allow-Methods': '*'
  });
  const url = 'https://geodata.solutions/restapi?dd=1';
  this.http.get(url)
      .toPromise()
      .then(async data => {
        // Toda la data (con codigo de pais y nombre de pais) que es obtenida de la url es pasada a la variable global paises
        this.countries = data;
        this.arrayCountries = data;
        await this.loadingCtrl.dismiss()
      }).catch(async e => {
    await this.loadingCtrl.dismiss()
    console.log('error al traer los países', e)
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
  'Access-Control-Allow-Origin': '*' ,
  'Access-Control-Allow-Headers': '*' ,
  'Access-Control-Allow-Methods': '*'
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
    'Access-Control-Allow-Origin': '*' ,
    'Access-Control-Allow-Headers': '*' ,
    'Access-Control-Allow-Methods': '*'
    });
  const url = `https://geodata.solutions/restapi?dd=1&country=${this.countryCode}&state=${this.stateCode}`;
  this.http.get(url).toPromise().then(data => {
  this.cities = data;
  });
}

async createProfile() {
  await this.loadingCtrl.present({});
  this.user = await this.store.get('profile');
  this.user = this.aes.decrypt(this.user);
  this.bodyForm = {
    userId: this.user.data.userId,
    address1: this.address1,
    address2: this.address2,
    country: this.country,
    state: this.state,
    city: this.city,
    zip: this.zip
  };
  console.log(`profile/${this.user.id}/update`);
  console.log(this.bodyForm);
  console.log(this.aut);
  const response = await this.axios.put(`profile/${this.user.data.id}/update`, this.bodyForm, this.aut);
  console.log('respuesta put', response);
  if (response.status === 200) {
    await this.loadingCtrl.dismiss()
    await this.router.navigate(['app/tabs']);
    await this.store.set('user', JSON.stringify(response.data));
  } else {
    await this.loadingCtrl.dismiss();
  }
}

}
